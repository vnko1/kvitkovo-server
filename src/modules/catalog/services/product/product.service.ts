import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Optional,
  UpdateOptions,
} from "sequelize";

import { AppService } from "src/common/services";

import { Product } from "../../models";

@Injectable()
export class ProductService extends AppService {
  constructor(@InjectModel(Product) private readonly model: typeof Product) {
    super();
  }

  async createInstance<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.model.create(values, opt);
  }

  async updateInstance<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.model.update(values, opt);
  }

  async deleteInstance(opt: DestroyOptions) {
    return this.model.destroy(opt);
  }

  async findInstance(opt?: FindOptions) {
    return this.model.findOne(opt);
  }

  async findInstanceById(pk: number, opt?: FindOptions) {
    return this.model.findByPk(pk, opt);
  }

  async findInstances(opt?: FindOptions) {
    return this.model.findAll(opt);
  }

  async findAndCountInstances(opt?: Omit<FindAndCountOptions<any>, "group">) {
    return this.model.findAndCountAll(opt);
  }
}
