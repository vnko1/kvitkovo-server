import {
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
import { Product } from ".";

@Table
export class Image extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  imageId: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  mainImage: boolean;

  @Column({ type: DataType.STRING })
  url: string;

  @Column({ type: DataType.STRING })
  smallUrl: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  product: Product;
}
