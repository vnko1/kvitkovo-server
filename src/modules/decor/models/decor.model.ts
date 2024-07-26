import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { DecorStatusEnum } from "src/types";

import { Shop } from "src/modules/shop";
import { User } from "src/modules/user";

@Table
export class Decor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  decorId: number;

  @Column({ type: DataType.STRING })
  comment: string;

  @Column({
    type: DataType.ENUM(
      DecorStatusEnum.ACCEPTED,
      DecorStatusEnum.CANCELED,
      DecorStatusEnum.DELIVERED,
      DecorStatusEnum.DONE,
      DecorStatusEnum.NEW
    ),
  })
  status: DecorStatusEnum;

  @Column({ type: DataType.STRING })
  customerName: string;

  @Column({ type: DataType.STRING })
  customerPhone: string;

  @Column({ type: DataType.STRING })
  addressCity: string;

  @Column({ type: DataType.STRING })
  addressStreet: string;

  @Column({ type: DataType.STRING })
  addressApartment: string;

  @ForeignKey(() => User)
  @Column
  managerId: number;

  @BelongsTo(() => User, { as: "manager" })
  manager: User;

  @ForeignKey(() => User)
  @Column
  customerId: number;

  @BelongsTo(() => User, { as: "customer" })
  customer: User;

  @ForeignKey(() => Shop)
  @Column
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
