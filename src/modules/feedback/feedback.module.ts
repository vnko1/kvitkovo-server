import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import {
  AnswerFeedbackMessageFile,
  AnswerMessage,
  FeedbackMessage,
} from "./models";
import {
  AnswerFeedbackFileService,
  FeedbackMessageService,
  AnswerMessageService,
} from "./services";

@Module({
  imports: [
    SequelizeModule.forFeature([
      AnswerFeedbackMessageFile,
      AnswerMessage,
      FeedbackMessage,
    ]),
  ],
  providers: [
    AnswerFeedbackFileService,
    FeedbackMessageService,
    AnswerMessageService,
  ],
  exports: [
    AnswerFeedbackFileService,
    FeedbackMessageService,
    AnswerMessageService,
  ],
})
export class FeedbackModule {}
