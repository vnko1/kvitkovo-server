import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Product } from "../../models";

@Injectable()
export class ProductService extends InstanceService<Product> {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product
  ) {
    super(productModel);
  }
}
