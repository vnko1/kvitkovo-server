import {
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  FindOrCreateOptions,
  RestoreOptions,
  UpdateOptions,
} from "sequelize";
import { ScopeType } from "src/types";

export interface InstanceInterface<T> {
  findOrCreate(
    opt: FindOrCreateOptions,
    scope?: ScopeType
  ): Promise<[T, boolean]>;

  add(data: any, opt?: CreateOptions): Promise<T>;

  edit<T extends object>(
    data: T,
    opt: UpdateOptions
  ): Promise<[affectedCount: number]>;

  delete(opt: DestroyOptions): Promise<number>;

  restore(opt: RestoreOptions): Promise<void>;

  findByPk<M extends string | number>(
    pk: M,
    opt?: FindOptions,
    scope?: ScopeType
  ): Promise<T>;

  findOne(opt?: FindOptions, scope?: ScopeType): Promise<T>;

  findAll(opt?: FindOptions, scope?: ScopeType): Promise<T[]>;

  findAndCountAll(
    opt?: Omit<FindAndCountOptions<any>, "group">,
    scope?: ScopeType
  ): Promise<{
    rows: T[];
    count: number;
  }>;
}
