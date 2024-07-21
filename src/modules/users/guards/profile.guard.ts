import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RolesEnum } from "src/types";

import { RIGHTS_KEY } from "src/common/decorators";
import { AppService } from "src/common/services";

import { User } from "src/modules/user";

@Injectable()
export class ProfileGuard extends AppService implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      RIGHTS_KEY,
      [ctx.getHandler(), ctx.getClass()]
    );

    if (!requiredRoles) return true;

    const req = ctx.switchToHttp().getRequest();
    const [key] = Object.keys(req.params);

    const user: User = req.user;

    if (requiredRoles.includes(user.roles))
      return user.userId === +req.params[key];

    return true;
  }
}
