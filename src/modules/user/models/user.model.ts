import {
  AllowNull,
  AutoIncrement,
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
import { ProviderEnum, RoleEnum, StatusEnum } from "src/types";

@DefaultScope(() => ({}))
@Scopes(() => ({}))
@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  userId: number;

  @AllowNull
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

  @Column({ type: DataType.ENUM(ProviderEnum.GOOGLE, ProviderEnum.LOCAL) })
  provider: ProviderEnum;

  @AllowNull
  @Column({ type: DataType.STRING })
  phone: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  birthday: string | null;

  @AllowNull
  @Column({ type: DataType.STRING })
  comment: string | null;

  @Column({ type: DataType.STRING })
  password: string;

  @Default(StatusEnum.INACTIVE)
  @Column({
    type: DataType.ENUM(
      StatusEnum.ACTIVE,
      StatusEnum.INACTIVE,
      StatusEnum.DELETED
    ),
  })
  status: StatusEnum;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  emailConfirmed: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  newsletter: boolean;

  @Default(RoleEnum.USER)
  @Column({
    type: DataType.ENUM(RoleEnum.USER, RoleEnum.ADMIN),
  })
  role: RoleEnum;
}
