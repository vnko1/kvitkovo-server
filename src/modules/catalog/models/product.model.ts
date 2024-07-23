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
import { Color } from "./color.model";
import { Size } from "./size.model";
import { ProductType } from "./productType.model";

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
  status: ProductStatusEnum;

  @Column({ type: DataType.BOOLEAN })
  allowAddToConstructor: boolean;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  category: Category;

  @ForeignKey(() => Color)
  @Column
  colorId: number;

  @BelongsTo(() => Color, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  color: Color;

  @ForeignKey(() => Size)
  @Column
  sizeId: number;

  @BelongsTo(() => Size, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  size: Size;

  @ForeignKey(() => ProductType)
  @Column
  productTypeId: number;

  @BelongsTo(() => ProductType, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  productType: ProductType;
}
