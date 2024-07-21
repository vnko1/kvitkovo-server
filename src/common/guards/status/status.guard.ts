import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RolesEnum, StatusEnum } from "src/types";

import { IS_PUBLIC_KEY } from "src/common/decorators";

import { User } from "src/modules/user";

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest();

    const user: User = req.user;

    if (user.roles === RolesEnum.USER)
      return user.emailConfirmed && user.status === StatusEnum.ACTIVE;

    if (user.roles === RolesEnum.MANAGER)
      return user.status === StatusEnum.ACTIVE;

    return true;
  }
}
