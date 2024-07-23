import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  // ForeignKey,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import {
  CategoryIconEnum,
  CategoryStatusEnum,
  SortValuesEnum,
} from "src/types";
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
  categoryStatus: CategoryStatusEnum;

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

  @Default(SortValuesEnum.DESC)
  @Column({
    type: DataType.ENUM(SortValuesEnum.DESC, SortValuesEnum.ASC),
  })
  sort: SortValuesEnum;

  @HasMany(() => Product, {})
  products: Product[];

  // @ForeignKey(() => Team)
  // @Column
  // teamId: number;

  // @BelongsTo(() => Team)
  // team: Team;
}
