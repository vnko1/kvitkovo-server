import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";

import { RolesEnum } from "src/types";
import { Public } from "src/common/decorators";
import { ValidationPipe } from "src/common/pipes";

import {
  RegisterDto,
  registerSchema,
  ResetCodeDto,
  resetCodeSchema,
  LoginDto,
  loginSchema,
} from "../dto";
import { AuthService } from "../services";

@Controller("auth")
export class AuthController {
  private readonly adminCred = process.env.ADMIN_CRED;
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(new ValidationPipe(registerSchema))
  @Post("admin/register")
  async adminRegister(@Body() registerDto: RegisterDto) {
    if (registerDto.password !== this.adminCred) throw new ForbiddenException();
    return await this.authService.register(registerDto, RolesEnum.ADMIN);
  }

  @Public()
  @UsePipes(new ValidationPipe(registerSchema))
  @Post("register")
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Public()
  @Get("confirm/reset")
  @UsePipes(new ValidationPipe(resetCodeSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetConfirmationCode(@Body() resetCodeDto: ResetCodeDto) {
    return await this.authService.resetCode(resetCodeDto);
  }

  @Public()
  @Get("email/confirm/:confirmationCode")
  async confirmCode(@Param("confirmationCode") confirmationCode: string) {
    return await this.authService.confirmEmail(confirmationCode);
  }

  @Public()
  @Post("login")
  @UsePipes(new ValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
