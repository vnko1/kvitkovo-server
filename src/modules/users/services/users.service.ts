import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";

import { UserService } from "src/modules/user";
import { RolesEnum } from "src/types";

@Injectable()
export class UsersService extends AppService {
  constructor(private readonly userService: UserService) {
    super();
  }

  async getUser(userId: number, roles: RolesEnum) {
    return this.userService.findUserByPK(
      userId,
      { paranoid: roles === RolesEnum.USER },
      this.getUserScopeByRole(roles)
    );
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
}
