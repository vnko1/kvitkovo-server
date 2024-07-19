import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import {
  CreateOptions,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  FindOrCreateOptions,
  Optional,
  RestoreOptions,
  UpdateOptions,
} from "sequelize";

import { ScopeType } from "src/types";
import { AppService } from "src/common/services";

import { User } from "../models";

@Injectable()
export class UserService extends AppService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super();
  }

  findOrCreateUser(opt: FindOrCreateOptions) {
    return this.userModel.findOrCreate(opt);
  }

  createUser<T extends Optional<any, string>>(values: T, opt?: CreateOptions) {
    return this.userModel.create(values, opt);
  }

  findUserByPK(pk: number, opt?: FindOptions, scopeOpt?: ScopeType) {
    return this.userModel.scope(scopeOpt).findByPk(pk, opt);
  }

  updateUser<T extends Optional<any, string>>(values: T, opt?: UpdateOptions) {
    return this.userModel.update(values, opt);
  }

  deleteUser(opt: DestroyOptions) {
    return this.userModel.destroy(opt);
  }

  restoreUser(opt: RestoreOptions) {
    return this.userModel.restore(opt);
  }

  getAllUsers(opt: FindOptions, scopeOpt?: ScopeType) {
    return this.userModel.scope(scopeOpt).findAll(opt);
  }

  findAndCountData(
    opt?: Omit<FindAndCountOptions<any>, "group">,
    scopeOpt?: ScopeType
  ) {
    return this.userModel.scope(scopeOpt).findAndCountAll(opt);
  }
}
