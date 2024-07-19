import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY } from 'src/common/decorators';
import { AppService } from 'src/common/services';

import { UserService } from 'src/modules/user';

@Injectable()
export class AuthGuard extends AppService implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findUserByPK(
        payload.sub,
        undefined,
        'adminScope',
      );

      if (!user) throw new UnauthorizedException();

      req['user'] = user;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
