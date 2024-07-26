import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { BaseAbstractService } from "src/common/services";

import { Color } from "../../models";

@Injectable()
export class ColorService extends BaseAbstractService<Color> {
  constructor(@InjectModel(Color) protected readonly model: typeof Color) {
    super(model);
  }

  // async createInstance(values: Partial<Color>, opt?: CreateOptions) {
  //   return this.model.create(values, opt);
  // }

  // async updateInstance<T extends Optional<any, string>>(
  //   values: T,
  //   opt?: UpdateOptions
  // ) {
  //   return this.model.update(values, opt);
  // }

  // async deleteInstance(opt: DestroyOptions) {
  //   return this.model.destroy(opt);
  // }

  // async findInstance(opt?: FindOptions) {
  //   return this.model.findOne(opt);
  // }

  // async findInstanceById(pk: number, opt?: FindOptions) {
  //   return this.model.findByPk(pk, opt);
  // }

  // async findInstances(opt?: FindOptions) {
  //   return this.model.findAll(opt);
  // }
}
