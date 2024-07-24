import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { ImageService } from "src/modules/catalog";

@Injectable()
export class ImagesService extends AppService {
  constructor(private readonly instanceService: ImageService) {
    super();
  }
}
