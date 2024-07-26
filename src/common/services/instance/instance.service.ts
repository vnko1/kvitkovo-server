import {
  CreateOptions,
  Model,
  ModelStatic,
  UpdateOptions,
  DestroyOptions,
  FindOptions,
  FindAndCountOptions,
  FindOrCreateOptions,
  RestoreOptions,
} from "sequelize";

import { ScopeType } from "src/types";

import { AppService } from "../app/app.service";

import { InstanceInterface } from "./instance.interface";

export abstract class InstanceService<TModel extends Model>
  extends AppService
  implements InstanceInterface<TModel>
{
  constructor(private readonly model: ModelStatic<TModel>) {
    super();
  }

  findOrCreate(
    opt: FindOrCreateOptions,
    scope?: ScopeType
  ): Promise<[TModel, boolean]> {
    if (scope) return this.model.scope(scope).findOrCreate(opt);
    return this.model.findOrCreate(opt);
  }

  add(data: any, opt?: CreateOptions): Promise<TModel> {
    return this.model.create(data, opt);
  }

  edit<T extends object>(
    data: T,
    opt: UpdateOptions
  ): Promise<[affectedCount: number]> {
    return this.model.update(data, opt);
  }

  delete(opt: DestroyOptions): Promise<number> {
    return this.model.destroy(opt);
  }

  restore(opt: RestoreOptions): Promise<void> {
    return this.model.restore(opt);
  }

  findByPk<M extends string | number>(
    pk: M,
    opt?: FindOptions,
    scope?: ScopeType
  ): Promise<TModel> {
    if (scope) return this.model.scope(scope).findByPk(pk, opt);
    return this.model.findByPk(pk, opt);
  }

  findOne(opt?: FindOptions, scope?: ScopeType): Promise<TModel> {
    if (scope) return this.model.scope(scope).findOne(opt);
    return this.model.findOne(opt);
  }

  findAll(opt?: FindOptions, scope?: ScopeType): Promise<TModel[]> {
    if (scope) return this.model.scope(scope).findAll(opt);
    return this.model.findAll(opt);
  }

  findAndCountAll(
    opt?: Omit<FindAndCountOptions<any>, "group">,
    scope?: ScopeType
  ): Promise<{ rows: TModel[]; count: number }> {
    if (scope) return this.model.scope(scope).findAndCountAll(opt);
    return this.model.findAndCountAll(opt);
  }
}
