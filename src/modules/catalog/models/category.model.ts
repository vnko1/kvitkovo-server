import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { CategoryIconEnum, CategoryStatusEnum } from "src/types";
import { Product } from "./product.model";

@Table
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  alias: string;

  @Column({ type: DataType.STRING })
  metaDescription: string;

  @Column({ type: DataType.STRING })
  metaKeywords: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Default(CategoryStatusEnum.ACTIVE)
  @Column({
    type: DataType.ENUM(CategoryStatusEnum.ACTIVE, CategoryStatusEnum.INACTIVE),
  })
  status: CategoryStatusEnum;

  @Default(CategoryIconEnum.FLOWERS)
  @Column({
    type: DataType.ENUM(
      CategoryIconEnum.BASKET,
      CategoryIconEnum.BOUQUET,
      CategoryIconEnum.DECOR,
      CategoryIconEnum.FLOWERS,
      CategoryIconEnum.ROOM,
      CategoryIconEnum.SALE,
      CategoryIconEnum.WEDDING
    ),
  })
  icon: CategoryIconEnum;

  @Default(0)
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  sortValue: number;

  @HasMany(() => Product, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  products: Product[];

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  @BelongsTo(() => Category, "parentId")
  parent: Category;

  @HasMany(() => Category, "parentId")
  children: Category[];
}
