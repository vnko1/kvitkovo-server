import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";
import { Decor } from "../models";

@Injectable()
export class DecorService extends InstanceService<Decor> {
  constructor(@InjectModel(Decor) private readonly decorModel: typeof Decor) {
    super(decorModel);
  }
}
