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

import { Size } from "../../models";

@Injectable()
export class SizeService extends AppService {
  constructor(@InjectModel(Size) private readonly sizeModel: typeof Size) {
    super();
  }

  async createInstance<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.sizeModel.create(values, opt);
  }

  async updateInstance<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.sizeModel.update(values, opt);
  }

  async deleteInstance(opt: DestroyOptions) {
    return this.sizeModel.destroy(opt);
  }

  async findInstance(opt?: FindOptions) {
    return this.sizeModel.findOne(opt);
  }

  async findInstanceById(pk: number, opt?: FindOptions) {
    return this.sizeModel.findByPk(pk, opt);
  }

  async findInstances(opt?: FindOptions) {
    return this.sizeModel.findAll(opt);
  }
}
