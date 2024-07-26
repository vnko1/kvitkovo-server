import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { ProductType } from "../../models";

@Injectable()
export class ProductTypeService extends InstanceService<ProductType> {
  constructor(
    @InjectModel(ProductType)
    private readonly productTypeModel: typeof ProductType
  ) {
    super(productTypeModel);
  }
}
