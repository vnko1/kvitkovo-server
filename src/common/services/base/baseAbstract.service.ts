import {
  UpdateOptions,
  DestroyOptions,
  FindOptions,
  Optional,
  Model,
  ModelStatic,
  CreateOptions,
} from "sequelize";
import { AppService } from "../app/app.service";

export abstract class BaseAbstractService<T extends Model> extends AppService {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    super();
    this.model = model;
  }

  async createInstance(values: any, opt?: CreateOptions) {
    return this.model.create(values, opt);
  }

  async updateInstance<M extends Optional<any, string>>(
    values: M,
    opt?: UpdateOptions
  ): Promise<[affectedCount: number]> {
    return this.model.update(values, opt);
  }

  async deleteInstance(opt: DestroyOptions): Promise<number> {
    return this.model.destroy(opt);
  }

  async findInstance(opt?: FindOptions): Promise<T | null> {
    return this.model.findOne(opt);
  }

  async findInstanceById(pk: number, opt?: FindOptions): Promise<T | null> {
    return this.model.findByPk(pk, opt);
  }

  async findInstances(opt?: FindOptions): Promise<T[]> {
    return this.model.findAll(opt);
  }
}
