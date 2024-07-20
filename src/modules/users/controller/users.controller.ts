import { Controller, Get, UseGuards } from "@nestjs/common";

import { RolesEnum } from "src/types";

import { Roles } from "src/common/decorators";
import { ProfileGuard } from "src/common/guards";

import { UsersService } from "../services";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @UseGuards(ProfileGuard)
  @Get(":userId")
  async getUserById() {
    return 1;
  }
}
