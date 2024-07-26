import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
  CreatedAt,
} from "sequelize-typescript";

import { User } from "src/modules/user";

import { FeedbackMessage } from "./feedbackMessage.model";
import { AnswerFeedbackMessageFile } from "./answerFeedbackFile.model";

@Table
export class AnswerMessage extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  @Column(DataType.DATE)
  created: Date;

  @Column
  fromUser: boolean;

  @Column(DataType.TEXT)
  messageText: string;

  @ForeignKey(() => FeedbackMessage)
  @Column
  feedbackMessageId: number;

  @BelongsTo(() => FeedbackMessage)
  message: FeedbackMessage;

  @ForeignKey(() => User)
  @Column
  managerId: number;

  @BelongsTo(() => User)
  manager: User;

  @HasMany(() => AnswerFeedbackMessageFile, { onDelete: "CASCADE" })
  files: AnswerFeedbackMessageFile[];
}
