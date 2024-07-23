import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductStatusEnum } from "src/types";
import { Category } from "./category.model";

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  productId: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  alias: string;

  @AllowNull
  @Column({ type: DataType.DECIMAL })
  price: number;

  @AllowNull
  @Column({ type: DataType.INTEGER })
  stock: number;

  @AllowNull
  @Column({ type: DataType.DECIMAL })
  priceWithDiscount: number;

  @AllowNull
  @Column({ type: DataType.DECIMAL })
  discount: number;

  @AllowNull
  @Column({ type: DataType.STRING })
  metaDescription: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  metaKeywords: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  description: string;

  @Default(ProductStatusEnum.DRAFT)
  @Column({
    type: DataType.ENUM(
      ProductStatusEnum.ACTIVE,
      ProductStatusEnum.DRAFT,
      ProductStatusEnum.INACTIVE
    ),
  })
  productStatus: ProductStatusEnum;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
