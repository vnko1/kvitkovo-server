import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { Category } from "../../models";

@Injectable()
export class CategoryService extends InstanceService<Category> {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) {
    super(categoryModel);
  }
}
