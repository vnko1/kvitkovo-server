import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "../models";
import { InstanceService } from "src/common/services";

@Injectable()
export class UserService extends InstanceService<User> {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super(userModel);
  }
}
