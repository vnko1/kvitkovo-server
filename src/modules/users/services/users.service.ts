import { ForbiddenException, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import { RolesEnum } from "src/types";

import { AppService } from "src/common/services";

import { MailService } from "src/modules/mail";
import { UserService } from "src/modules/user";

import {
  ChangePasswordDto,
  ChangeResetPasswordDto,
  CreateUserDto,
  UpdateEmployeesDto,
} from "../dto";
import { UpdateUserDto } from "../dto/updateUser.dto";

@Injectable()
export class UsersService extends AppService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {
    super();
  }

  private getConfirmUrl(code: string) {
    return `${process.env.CLIENT_URL}/user/reset-password/${code}`;
  }

  async getUser(userId: number, roles: RolesEnum) {
    const user = await this.userService.findUserByPK(
      userId,
      { paranoid: roles === RolesEnum.USER },
      this.getUserScopeByRole(roles)
    );

    if (roles === RolesEnum.MANAGER && user.roles === RolesEnum.ADMIN)
      throw new ForbiddenException();

    return user;
  }

  async deleteUser(userId: number, force = false) {
    return this.userService.deleteUser({ where: { userId }, force });
  }

  async findUsers(
    searchRoles: RolesEnum,
    offset: number,
    limit: number,
    roles: RolesEnum
  ) {
    return this.userService.findAndCountData(
      {
        where: { roles: searchRoles },
        offset,
        limit,
        paranoid: true,
      },
      this.getUserScopeByRole(roles)
    );
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);

    const tempPass = this.genTempPass();
    newUser.password = tempPass;
    await newUser.save();
    const sentOpt = this.mailService.temporaryPassTemp(newUser.email, tempPass);
    await this.mailService.sendEmail(sentOpt);

    return newUser;
  }

  async resetPass(email: string) {
    const user = await this.userService.findUser({ where: { email } });
    if (!user) throw new ForbiddenException();

    user.setVerificationCode(randomUUID());
    await user.save();

    const sentOpt = this.mailService.resetPassTemp(
      user.email,
      this.getConfirmUrl(user.verificationCode)
    );
    return await this.mailService.sendEmail(sentOpt);
  }

  async changeResetPassword(changeResetPasswordDto: ChangeResetPasswordDto) {
    const user = await this.userService.findUser({
      where: { verificationCode: changeResetPasswordDto.verificationCode },
    });
    if (!user) throw new ForbiddenException();
    user.password = changeResetPasswordDto.password;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    return await user.save();
  }

  async changePassword(userId: number, changePassword: ChangePasswordDto) {
    const user = await this.userService.findUserByPK(userId);
    user.password = changePassword.password;
    return await user.save();
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto | UpdateEmployeesDto,
    roles: RolesEnum,
    onlyEmployees?: boolean
  ) {
    const user = await this.userService.findUserByPK(
      userId,
      { paranoid: roles === RolesEnum.USER },
      this.getUserScopeByRole(roles)
    );

    if (onlyEmployees && user.roles === RolesEnum.USER)
      throw new ForbiddenException();

    Object.keys(updateUserDto).forEach(
      (data) => (user[data] = updateUserDto[data])
    );
    return await user.save();
  }
}
