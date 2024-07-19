import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from "@nestjs/common";

import { Public } from "src/common/decorators";
import { ValidationPipe } from "src/common/pipes";

import { RegisterDto, registerSchema } from "../dto";
import { AuthService } from "../services";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(new ValidationPipe(registerSchema))
  @Post("register")
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
