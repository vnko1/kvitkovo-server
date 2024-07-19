import { Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  @Public()
  @Post('register')
  async register() {
    return 1;
  }
}
