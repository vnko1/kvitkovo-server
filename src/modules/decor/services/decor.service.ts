import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { BaseAbstractService } from "src/common/services";
import { Decor } from "../models";

@Injectable()
export class DecorService extends BaseAbstractService<Decor> {
  constructor(@InjectModel(Decor) protected readonly model: typeof Decor) {
    super(model);
  }
}
