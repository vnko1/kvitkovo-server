import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { Request, Response } from "express";

import { RolesEnum, StatusEnum } from "src/types";
import { Public } from "src/common/decorators";
import { BodyValidationPipe } from "src/common/pipes";

import {
  RegisterDto,
  registerSchema,
  ResetCodeDto,
  resetCodeSchema,
  LoginDto,
  loginSchema,
} from "../dto";
import { AuthService } from "../services";
import { GoogleOauthGuard } from "../guards";

@Controller("auth")
export class AuthController {
  private readonly adminCred = process.env.ADMIN_CRED;
  constructor(private readonly authService: AuthService) {}

  @Post("admin/register")
  @Public()
  @UsePipes(new BodyValidationPipe(registerSchema))
  async adminRegister(@Body() registerDto: RegisterDto) {
    if (registerDto.password !== this.adminCred) throw new ForbiddenException();
    return await this.authService.register(
      registerDto,
      RolesEnum.ADMIN,
      StatusEnum.ACTIVE
    );
  }

  @Post("register")
  @Public()
  @UsePipes(new BodyValidationPipe(registerSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Get("confirm/reset")
  @Public()
  @UsePipes(new BodyValidationPipe(resetCodeSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetVerificationCode(@Body() resetCodeDto: ResetCodeDto) {
    return await this.authService.resetCode(resetCodeDto);
  }

  @Get("email/confirm/:verificationCode")
  @Public()
  async confirmCode(@Param("verificationCode") verificationCode: string) {
    return await this.authService.confirmEmail(verificationCode);
  }

  @Post("login")
  @Public()
  @UsePipes(new BodyValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get("google/login")
  @Public()
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get("google/callback")
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleOAuthCallBack(@Req() req: Request, @Res() res: Response) {
    const redirectUrl = `${process.env.CLIENT_URL}${process.env.CLIENT_PROFILE}`;
    const cred = await this.authService.googleLogin(req["user"]);
    return res.redirect(
      `${redirectUrl}?token=${cred.token}&userId=${cred.userId}`
    );
  }
}
