import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "crypto";
import { generate } from "otp-generator";

import { GoogleProfile, RolesEnum, StatusEnum } from "src/types";
import { AppService } from "src/common/services";

import { MailService } from "src/modules/mail";
import { User, UserService } from "src/modules/user";

import { LoginDto, RegisterDto, ResetCodeDto } from "../dto";
import { Payload, TempPassOptions } from "./auth.type";

@Injectable()
export class AuthService extends AppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {
    super();
  }

  private genTempPass(length = 8, options?: TempPassOptions) {
    const defaultOptions: TempPassOptions = { specialChars: false, ...options };
    return generate(length, defaultOptions);
  }

  private getConfirmUrl(code: string) {
    return `${process.env.CLIENT_URL}/user/email/${code}/confirm`;
  }

  private async sentConfirmCode(user: User) {
    user.setConfirmationCode(randomUUID());
    await user.save();
    const sentOpt = this.mailService.confirmEmailTemp(
      user.email,
      this.getConfirmUrl(user.confirmationCode)
    );
    await this.mailService.sendEmail(sentOpt);
  }

  private async generateToken(payload: Payload, expiresIn: string | number) {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  private async getCredResponse(payload: Payload) {
    return {
      token: await this.generateToken(payload, process.env.JWT_LIFE),
      userId: payload.sub,
    };
  }

  async register(
    registerDto: RegisterDto,
    roles: RolesEnum = RolesEnum.USER,
    status: StatusEnum = StatusEnum.INACTIVE
  ) {
    const user = await this.userService.createUser({
      ...registerDto,
      provider: "local",
      roles,
      status,
    });

    if (roles === RolesEnum.ADMIN) {
      user.status = StatusEnum.ACTIVE;
      user.emailConfirmed = true;
      await user.save();
      return await this.getCredResponse({
        sub: user.userId,
      });
    }

    await this.sentConfirmCode(user);
  }

  async resetCode({ email }: ResetCodeDto) {
    const user = await this.userService.findUser({ where: { email } });

    if (!user || user.status === StatusEnum.ACTIVE)
      throw new ForbiddenException();

    return await this.sentConfirmCode(user);
  }

  async confirmEmail(confirmationCode: string) {
    const user = await this.userService.findUser({
      where: { confirmationCode },
    });

    if (!user || user.status === StatusEnum.ACTIVE)
      throw new ForbiddenException();

    user.status = StatusEnum.ACTIVE;
    user.emailConfirmed = true;
    await user.save();

    return await this.getCredResponse({
      sub: user.userId,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUser({
      where: { email: loginDto.email },
    });

    if (!user) throw new UnauthorizedException();

    if (user.status === StatusEnum.INACTIVE) throw new ForbiddenException();

    const isValidPass = await this.checkPassword(
      loginDto.password,
      user.password
    );

    if (!isValidPass) throw new UnauthorizedException();

    return await this.getCredResponse({
      sub: user.userId,
    });
  }

  async googleLogin(googleProfile: GoogleProfile) {
    const [user] = await this.userService.findOrCreateUser(
      {
        where: { email: googleProfile.email },
        defaults: googleProfile,
        paranoid: false,
        isNewRecord: true,
      },
      "adminScope"
    );

    if (user.status === StatusEnum.INACTIVE) user.status = StatusEnum.ACTIVE;
    if (!user.password) {
      const tempPass = this.genTempPass();
      user.password = tempPass;
      const sentOpt = this.mailService.temporaryPassTemp(user.email, tempPass);
      await this.mailService.sendEmail(sentOpt);
    }
    user.emailConfirmed = true;
    await user.save();
    return this.getCredResponse({ sub: user.userId });
  }
}
