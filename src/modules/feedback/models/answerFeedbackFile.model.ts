import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { AnswerMessage } from "./answerMessage.model";

@Table
export class AnswerFeedbackMessageFile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  answerFeedbackFileId: number;

  @ForeignKey(() => AnswerMessage)
  @Column
  answerMessageId: number;

  @BelongsTo(() => AnswerMessage)
  message: AnswerMessage;

  @Column({ allowNull: false })
  name: string;

  @Column
  fileUrl: string;
}
