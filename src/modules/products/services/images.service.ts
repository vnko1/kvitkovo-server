import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { UploadApiOptions } from "cloudinary";
import { randomUUID } from "crypto";

import { AppService } from "src/common/services";

import { ImageService } from "src/modules/catalog";
import { CloudsService } from "src/modules/clouds";

import { CreateImageDto } from "../dto";

@Injectable()
export class ImagesService extends AppService {
  constructor(
    private readonly instanceService: ImageService,
    private readonly cloudsService: CloudsService
  ) {
    super();
  }

  private uploadOption: UploadApiOptions = {
    resource_type: "image",
    folder: "images/products",
    overwrite: false,
    format: "webp",
  };

  private async uploadImage(image: Express.Multer.File) {
    const imageRes = await this.cloudsService.upload(image.path, {
      ...this.uploadOption,
      public_id: randomUUID(),
    });

    const formattedImageRes = await this.cloudsService.edit(
      imageRes.secure_url,
      {
        fetch_format: "auto",
        quality: "auto",
        width: 100,
        height: 100,
        crop: "thumb",
      }
    );

    return { url: imageRes.secure_url, smallUrl: formattedImageRes };
  }

  async createInstance({ file, ...restInstanceDto }: CreateImageDto) {
    const imageRes = await this.uploadImage(file);
    return await this.instanceService.createInstance({
      ...restInstanceDto,
      ...imageRes,
    });
  }

  async deleteAllProductsImages(productId: number) {
    const instances = await this.instanceService.findInstances({
      where: { productId },
    });

    return await Promise.all(
      instances.map(async (instance) =>
        this.cloudsService
          .delete(instance.url)
          .then(async () => await instance.destroy())
          .catch(() => {
            throw new InternalServerErrorException();
          })
      )
    );
  }

  async deleteImage(imageId: number) {
    const instance = await this.instanceService.findInstanceById(imageId);
    if (!instance) throw new ForbiddenException();

    return await this.cloudsService.delete(instance.url);
  }

  async toggleMainImage(imageId: number) {
    const instance = await this.instanceService.findInstanceById(imageId);
    if (!instance) throw new ForbiddenException();

    instance.mainImage = !instance.mainImage;

    return await instance.save();
  }

  async getProductImages(productId: number) {
    return await this.instanceService.findInstances({ where: { productId } });
  }

  async getImage(imageId: number) {
    return await this.instanceService.findInstanceById(imageId);
  }
}
