import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";

import { UserService } from "src/modules/user";

@Injectable()
export class UsersService extends AppService {
  constructor(private readonly userService: UserService) {
    super();
  }

  async getUser(userId: number) {
    return this.userService.findUserByPK(userId, undefined, "userScope");
  }
}
