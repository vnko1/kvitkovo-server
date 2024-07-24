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

import { Color } from "../../models";

@Injectable()
export class ColorService extends AppService {
  constructor(@InjectModel(Color) private readonly colorModel: typeof Color) {
    super();
  }

  async createInstance<T extends Optional<any, string>>(
    values: T,
    opt?: CreateOptions
  ) {
    return this.colorModel.create(values, opt);
  }

  async updateInstance<T extends Optional<any, string>>(
    values: T,
    opt?: UpdateOptions
  ) {
    return this.colorModel.update(values, opt);
  }

  async deleteInstance(opt: DestroyOptions) {
    return this.colorModel.destroy(opt);
  }

  async findInstance(opt?: FindOptions) {
    return this.colorModel.findOne(opt);
  }

  async findInstanceById(pk: number, opt?: FindOptions) {
    return this.colorModel.findByPk(pk, opt);
  }

  async findInstances(opt?: FindOptions) {
    return this.colorModel.findAll(opt);
  }
}
