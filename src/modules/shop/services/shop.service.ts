import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Shop } from "../models";

@Injectable()
export class ShopService extends InstanceService<Shop> {
  constructor(@InjectModel(Shop) private readonly shopModel: typeof Shop) {
    super(shopModel);
  }
}
