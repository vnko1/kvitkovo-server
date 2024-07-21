import { ForbiddenException, Injectable } from "@nestjs/common";

import { RolesEnum } from "src/types";

import { AppService } from "src/common/services";

import { MailService } from "src/modules/mail";
import { UserService } from "src/modules/user";

import { CreateUserDto } from "../dto";

@Injectable()
export class UsersService extends AppService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {
    super();
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
    const sentOpt = this.mailService.temporaryPassTemp(newUser.email, tempPass);
    await this.mailService.sendEmail(sentOpt);
    await newUser.save();

    return newUser;
  }

  async resetPass(email: string) {
    const user = await this.userService.findUser({ where: { email } });
    return user;
  }
}
