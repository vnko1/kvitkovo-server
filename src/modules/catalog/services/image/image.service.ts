import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Image } from "../../models";

@Injectable()
export class ImageService extends InstanceService<Image> {
  constructor(@InjectModel(Image) private readonly imageModel: typeof Image) {
    super(imageModel);
  }
}
