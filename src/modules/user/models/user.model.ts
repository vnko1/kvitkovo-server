import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  DefaultScope,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";
import * as bcrypt from "bcrypt";

import { ProviderEnum, RolesEnum, StatusEnum } from "src/types";

const defaultAttribute = [
  "userId",
  "firstName",
  "lastName",
  "surName",
  "email",
  "phone",
  "birthday",
  "comment",
  "status",
  "emailConfirmed",
  "newsletter",
  "roles",
  "provider",
];

const adminAttributes = [
  "password",
  "verificationCode",
  "verificationCodeExpiry",
  "deletedAt",
  "createdAt",
  "updatedAt",
];

const managerScope = [
  "verificationCode",
  "verificationCodeExpiry",
  "deletedAt",
  "createdAt",
  "updatedAt",
];

@DefaultScope(() => ({
  attributes: defaultAttribute,
}))
@Scopes(() => ({
  adminScope: { attributes: [...defaultAttribute, ...adminAttributes] },
  userScope: { attributes: defaultAttribute },
  managerScope: { attributes: [...defaultAttribute, ...managerScope] },
}))
@Table({ paranoid: true })
export class User extends Model {
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed("password")) {
      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(instance.password, salt);
      instance.password = hashedPass;
    }
  }

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.STRING })
  firstName: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  lastName: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  surName: string | null;

  @Unique
  @Column({ type: DataType.STRING })
  email: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  phone: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  birthday: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  comment: string | null;

  @Default(StatusEnum.INACTIVE)
  @Column({
    type: DataType.ENUM(StatusEnum.ACTIVE, StatusEnum.INACTIVE),
  })
  status: StatusEnum;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  emailConfirmed: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  newsletter: boolean;

  @Column({
    type: DataType.ENUM(RolesEnum.USER, RolesEnum.ADMIN, RolesEnum.MANAGER),
  })
  roles: RolesEnum;

  @Column({ type: DataType.ENUM(ProviderEnum.GOOGLE, ProviderEnum.LOCAL) })
  provider: ProviderEnum;

  @Column({ type: DataType.STRING })
  password: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  verificationCode: string | null;

  @AllowNull
  @Column({ type: DataType.DATE })
  verificationCodeExpiry: Date | null;

  public setVerificationCode(code: string) {
    this.verificationCode = code;
    this.verificationCodeExpiry = new Date(Date.now() + 1000 * 60 * 15);
  }
}
