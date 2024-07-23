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
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product
  ) {
    super();
  }

  async createProduct<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.productModel.create(values, opt);
  }

  async updateProduct<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.productModel.update(values, opt);
  }

  async deleteProduct(opt: DestroyOptions) {
    return this.productModel.destroy(opt);
  }

  async findProduct(opt?: FindOptions) {
    return this.productModel.findOne(opt);
  }

  async findProductById(pk: number, opt?: FindOptions) {
    return this.productModel.findByPk(pk, opt);
  }

  async findProducts(opt: FindOptions) {
    return this.productModel.findAll(opt);
  }

  async findAndCountProducts(opt?: Omit<FindAndCountOptions<any>, "group">) {
    return this.productModel.findAndCountAll(opt);
  }
}
