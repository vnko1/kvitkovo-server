import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RolesEnum } from "src/types";
import { ROLES_KEY } from "src/common/decorators";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()]
    );

    if (!requiredRoles) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return requiredRoles.some((roles) => user.roles === roles);
  }
}
