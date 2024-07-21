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
  Put,
  Query,
  UseGuards,
  UsePipes,
} from "@nestjs/common";

import { paginationDefaultValues } from "src/utils";
import { RolesEnum } from "src/types";

import { Rights, Roles, UserData } from "src/common/decorators";
import { ValidationPipe } from "src/common/pipes";

import { UsersService } from "../services";
import { ProfileGuard } from "../guards";
import {
  ChangePasswordDto,
  changePasswordSchema,
  ChangeResetPasswordDto,
  changeResetPasswordSchema,
  CreateUserDto,
  createUserSchema,
  emailSchema,
  UpdateEmployeesDto,
  updateEmployeesSchema,
  UpdateUserDto,
  updateUserSchema,
} from "../dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user/:userId")
  @Roles(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Rights(RolesEnum.USER)
  @UseGuards(ProfileGuard)
  async getUserById(
    @Param("userId", ParseIntPipe) userId: number,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.getUser(userId, roles);
  }

  @Delete("user/:userId")
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @Rights(RolesEnum.USER)
  @UseGuards(ProfileGuard)
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

  @Get("employees")
  @Roles(RolesEnum.MANAGER, RolesEnum.ADMIN)
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

  @Get("clients")
  @Roles(RolesEnum.MANAGER, RolesEnum.ADMIN)
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

  @Post("user")
  @Roles(RolesEnum.ADMIN)
  @UsePipes(new ValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Post("reset-pass/:email")
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPass(@Param("email") email: string) {
    const isValidEmail = emailSchema.safeParse(email);

    if (!isValidEmail.success)
      throw new BadRequestException(isValidEmail.error.errors[0].message);

    return await this.usersService.resetPass(isValidEmail.data);
  }

  @Post("reset-pass")
  @UsePipes(new ValidationPipe(changeResetPasswordSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateResetPassword(
    @Body() changeResetPasswordDto: ChangeResetPasswordDto
  ) {
    return await this.usersService.changeResetPassword(changeResetPasswordDto);
  }

  @Post("change-pass")
  @UsePipes(new ValidationPipe(changePasswordSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @UserData("userId") userId: number,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return await this.usersService.changePassword(userId, changePasswordDto);
  }

  @Put("user/:userId")
  @Roles(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Rights(RolesEnum.USER, RolesEnum.MANAGER)
  @UseGuards(ProfileGuard)
  @UsePipes(new ValidationPipe(updateUserSchema))
  async updateUser(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.updateUser(userId, updateUserDto, roles);
  }

  @Put("employees/:userId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Rights(RolesEnum.MANAGER)
  @UseGuards(ProfileGuard)
  @UsePipes(new ValidationPipe(updateEmployeesSchema))
  async updateEmployees(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() updateEmployeesDto: UpdateEmployeesDto,
    @UserData("roles") roles: RolesEnum
  ) {
    return await this.usersService.updateUser(
      userId,
      updateEmployeesDto,
      roles,
      true
    );
  }
}
