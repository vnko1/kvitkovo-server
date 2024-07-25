import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "./product.model";

@Table
export class Size extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  sizeId: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  alias: string;

  @Column({ type: DataType.INTEGER })
  min: number;

  @Column({ type: DataType.INTEGER })
  max: number;

  @HasMany(() => Product)
  products: Product[];
}
