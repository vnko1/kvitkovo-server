import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RolesEnum } from "src/types";

import { ROLES_KEY } from "src/common/decorators";
import { AppService } from "src/common/services";

import { User } from "src/modules/user";

@Injectable()
export class ProfileGuard extends AppService implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()]
    );

    const req = ctx.switchToHttp().getRequest();
    const [key] = Object.keys(req.params);

    const isUserRole = requiredRoles.includes(RolesEnum.USER);
    const user = req.user as User;
    if (isUserRole && user.roles === RolesEnum.USER) {
      const isOwn = user.userId === req.params[key];
      if (!isOwn) throw new ForbiddenException();
    }

    return true;
  }

  private getPropertyKey(key: string) {
    if (key === "notsId") return "userNots";
    return "userId";
  }
}
