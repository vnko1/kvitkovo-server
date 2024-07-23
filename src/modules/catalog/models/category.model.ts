import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  // ForeignKey,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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

  // @ForeignKey(() => Team)
  // @Column
  // teamId: number;

  // @BelongsTo(() => Team)
  // team: Team;
}
