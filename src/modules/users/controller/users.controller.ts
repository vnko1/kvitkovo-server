import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from "@nestjs/common";

import { paginationDefaultValues } from "src/utils";
import { RolesEnum } from "src/types";

import { Roles, User } from "src/common/decorators";
import { ValidationPipe } from "src/common/pipes";

import { UsersService } from "../services";
import { ProfileGuard } from "../guards";
import {
  ChangeResetPasswordDto,
  changeResetPasswordSchema,
  CreateUserDto,
  createUserSchema,
  emailSchema,
} from "../dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UseGuards(ProfileGuard)
  @Get("user/:userId")
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @User("roles") roles: RolesEnum
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
    @User("roles") roles: RolesEnum
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
    @User("roles") roles: RolesEnum
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
    @User("roles") roles: RolesEnum
  ) {
    return await this.usersService.findUsers(
      RolesEnum.USER,
      offset,
      limit,
      roles
    );
  }

  @Roles(RolesEnum.ADMIN)
  @UsePipes(new ValidationPipe(createUserSchema))
  @Post("user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Post("reset-pass/:email")
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPass(@Param("email") email: string) {
    const isValidEmail = emailSchema.safeParse(email);

    if (!isValidEmail.success) {
      throw new BadRequestException(isValidEmail.error.errors[0].message);
    }

    return await this.usersService.resetPass(isValidEmail.data);
  }

  @UsePipes(new ValidationPipe(changeResetPasswordSchema))
  @Post("reset-pass")
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateResetPassword(
    @Body() changeResetPasswordDto: ChangeResetPasswordDto
  ) {
    return await this.usersService.changeResetPassword(changeResetPasswordDto);
  }
}
