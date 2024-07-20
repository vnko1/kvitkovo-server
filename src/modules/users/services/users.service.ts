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
      this.getScopeByRole(roles)
    );
  }
}
