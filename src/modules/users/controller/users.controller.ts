import {
  // Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";

import { paginationDefaultValues } from "src/utils";
import { RolesEnum } from "src/types";

import { Roles, UserData } from "src/common/decorators";

import { UsersService } from "../services";
import { ProfileGuard } from "../guards";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ProfileGuard)
  @Roles(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Get("user/:userId")
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.getUser(userId, roles);
  }

  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @UseGuards(ProfileGuard)
  @Delete("user/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @Query("forceDelete", new DefaultValuePipe(false), ParseBoolPipe)
    force: boolean,
    @UserData("roles") roles: RolesEnum
  ) {
    const forceDelete = roles === RolesEnum.ADMIN && force;
    return await this.usersService.deleteUser(userId, forceDelete);
  }

  @Roles(RolesEnum.MANAGER, RolesEnum.ADMIN)
  @Get("employees")
  async getEmployees(
    @Query(
      "offset",
      new DefaultValuePipe(paginationDefaultValues.offset),
      ParseIntPipe
    )
    offset: number,
    @Query(
      "limit",
      new DefaultValuePipe(paginationDefaultValues.limit),
      ParseIntPipe
    )
    limit: number,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.findUsers(
      RolesEnum.MANAGER,
      offset,
      limit,
      roles
    );
  }

  @Roles(RolesEnum.MANAGER, RolesEnum.ADMIN)
  @Get("clients")
  async getUsers(
    @Query(
      "offset",
      new DefaultValuePipe(paginationDefaultValues.offset),
      ParseIntPipe
    )
    offset: number,
    @Query(
      "limit",
      new DefaultValuePipe(paginationDefaultValues.limit),
      ParseIntPipe
    )
    limit: number,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.findUsers(
      RolesEnum.USER,
      offset,
      limit,
      roles
    );
  }
}
