import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./product.model";

@Table
export class Color extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  colorId: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  alias: string;

  @BelongsTo(() => Product)
  product: Product;
}
