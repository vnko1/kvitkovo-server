import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Size } from "../../models";

@Injectable()
export class SizeService extends InstanceService<Size> {
  constructor(@InjectModel(Size) private readonly sizeModel: typeof Size) {
    super(sizeModel);
  }
}
