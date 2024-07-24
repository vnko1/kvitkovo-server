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

import { ProductType } from "../../models";

@Injectable()
export class ProductTypeService extends AppService {
  constructor(
    @InjectModel(ProductType)
    private readonly productTypeModel: typeof ProductType
  ) {
    super();
  }

  async createInstance<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.productTypeModel.create(values, opt);
  }

  async updateInstance<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.productTypeModel.update(values, opt);
  }

  async deleteInstance(opt: DestroyOptions) {
    return this.productTypeModel.destroy(opt);
  }

  async findInstance(opt?: FindOptions) {
    return this.productTypeModel.findOne(opt);
  }

  async findInstanceById(pk: number, opt?: FindOptions) {
    return this.productTypeModel.findByPk(pk, opt);
  }

  async findInstances(opt: FindOptions) {
    return this.productTypeModel.findAll(opt);
  }
}
