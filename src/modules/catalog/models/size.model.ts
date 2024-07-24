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

  @HasMany(() => Product)
  products: Product[];
}
