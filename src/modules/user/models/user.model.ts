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
} from 'sequelize-typescript';
import { ProviderEnum, RoleEnum, StatusEnum } from 'src/types';

const defaultAttribute = [
  'userId',
  'firstName',
  'lastName',
  'surName',
  'email',
  'phone',
  'birthday',
  'comment',
  'status',
  'emailConfirmed',
  'newsletter',
  'role',
  'provider',
];

const adminAttributes = ['password'];

@DefaultScope(() => ({
  attributes: [...defaultAttribute],
}))
@Scopes(() => ({
  adminScope: { attributes: [...defaultAttribute, ...adminAttributes] },
}))
@Table({ paranoid: true })
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
  roles: RoleEnum;

  @Column({ type: DataType.ENUM(ProviderEnum.GOOGLE, ProviderEnum.LOCAL) })
  provider: ProviderEnum;

  @Default(StatusEnum.INACTIVE)
  @Column({
    type: DataType.ENUM(StatusEnum.ACTIVE, StatusEnum.INACTIVE),
  })
  status: StatusEnum;
}
