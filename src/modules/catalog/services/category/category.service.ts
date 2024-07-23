import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  CreateOptions,
  DestroyOptions,
  FindOptions,
  Optional,
  UpdateOptions,
} from "sequelize";

import { AppService } from "src/common/services";

import { Category } from "../../models";

@Injectable()
export class CategoryService extends AppService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) {
    super();
  }

  async createCategory<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.categoryModel.create(values, opt);
  }

  async updateCategory<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.categoryModel.update(values, opt);
  }

  async deleteCategory(opt: DestroyOptions) {
    return this.categoryModel.destroy(opt);
  }

  async findCategory(opt?: FindOptions) {
    return this.categoryModel.findOne(opt);
  }

  async findCategoryById(pk: number, opt?: FindOptions) {
    return this.categoryModel.findByPk(pk, opt);
  }

  async findCategories(opt?: FindOptions) {
    return this.categoryModel.findAll(opt);
  }
}
