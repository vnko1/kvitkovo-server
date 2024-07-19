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

@Controller("auth")
export class AuthController {
  @Public()
  @UsePipes(new ValidationPipe(registerSchema))
  @Post("register")
  @HttpCode(HttpStatus.ACCEPTED)
  async register(@Body() registerDto: RegisterDto) {
    return registerDto;
  }
}
