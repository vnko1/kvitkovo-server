import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Color } from "../../models";

@Injectable()
export class ColorService extends InstanceService<Color> {
  constructor(@InjectModel(Color) private readonly colorModel: typeof Color) {
    super(colorModel);
  }
}
