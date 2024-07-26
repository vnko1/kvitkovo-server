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
import { MessageStatusEnum, MessageTypeEnum } from "src/types";

import { User } from "src/modules/user";

import { AnswerMessage } from "./answerMessage.model";

@Table
export class FeedbackMessage extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  @Column(DataType.DATE)
  created: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, "userId")
  author: User;

  @ForeignKey(() => User)
  @Column
  managerId: number;

  @BelongsTo(() => User, "managerId")
  manager: User;

  @Column(DataType.ENUM(MessageStatusEnum.NEW, MessageStatusEnum.CLOSED))
  status: MessageStatusEnum;

  @Column(DataType.ENUM(MessageTypeEnum.PHONE, MessageTypeEnum.EMAIL))
  type: MessageTypeEnum;

  @Column
  userName: string;

  @Column
  userEmail: string;

  @Column
  userPhone: string;

  @Column(DataType.TEXT)
  messageText: string;

  @HasMany(() => AnswerMessage, { onDelete: "CASCADE" })
  answers: AnswerMessage[];
}
