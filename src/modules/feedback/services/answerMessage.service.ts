import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { AnswerMessage } from "../models";

@Injectable()
export class AnswerMessageService extends InstanceService<AnswerMessage> {
  constructor(
    @InjectModel(AnswerMessage)
    private readonly answerModel: typeof AnswerMessage
  ) {
    super(answerModel);
  }
}
