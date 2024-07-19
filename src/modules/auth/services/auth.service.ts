import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuid } from "uuid";

import { ProviderEnum, RolesEnum } from "src/types";
import { AppService } from "src/common/services";

import { MailService } from "src/modules/mail";
import { User, UserService } from "src/modules/user";

import { RegisterDto } from "../dto";

@Injectable()
export class AuthService extends AppService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {
    super();
  }

  private getConfirmUrl(code: string) {
    return `${process.env.CLIENT_URL}/user/email/${code}/confirm`;
  }

  private async sentConfirmCode(user: User) {
    user.setConfirmationCode(uuid());
    await user.save();
    const sentOpt = this.mailService.mailSendOpt(
      user.email,
      this.getConfirmUrl(user.confirmationCode)
    );
    await this.mailService.sendEmail(sentOpt);
  }

  async register(
    registerDto: RegisterDto,
    provider: ProviderEnum = ProviderEnum.LOCAL,
    roles: RolesEnum = RolesEnum.USER
  ) {
    const user = await this.userService.createUser({
      ...registerDto,
      provider,
      roles,
    });

    if (provider === ProviderEnum.LOCAL) await this.sentConfirmCode(user);
  }
}
