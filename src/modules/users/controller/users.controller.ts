import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";

import { RolesEnum } from "src/types";

import { Roles, UserData } from "src/common/decorators";

import { UsersService } from "../services";
import { ProfileGuard } from "../guards";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ProfileGuard)
  @Roles(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Get(":userId")
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.getUser(userId, roles);
  }
}
