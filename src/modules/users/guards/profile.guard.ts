import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { RolesEnum } from "src/types";

import { AppService } from "src/common/services";

import { User } from "src/modules/user";

@Injectable()
export class ProfileGuard extends AppService implements CanActivate {
  constructor() {
    super();
  }
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const [key] = Object.keys(req.params);

    const user: User = req.user;

    if (user.roles === RolesEnum.USER) return user.userId === +req.params[key];

    return true;
  }
}
