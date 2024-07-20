import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";

import { RolesEnum } from "src/types";

import { Roles, UserData } from "src/common/decorators";

import { UsersService } from "../services";
import { ProfileGuard } from "../guards";
import { DeleteUserDto, deleteUserSchema } from "../dto";

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

  @UseGuards(ProfileGuard)
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @Delete(":userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() deleteUserDto: DeleteUserDto,
    @UserData("roles") roles: RolesEnum
  ) {
    const parsedSchema = deleteUserSchema.safeParse(deleteUserDto);

    const forceDelete =
      roles === RolesEnum.ADMIN &&
      parsedSchema.success &&
      deleteUserDto.forceDelete;
    return await this.usersService.deleteUser(userId, forceDelete);
  }
}
