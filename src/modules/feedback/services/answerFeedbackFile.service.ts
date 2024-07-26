import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { AnswerFeedbackMessageFile } from "../models";

@Injectable()
export class AnswerFeedbackFileService extends InstanceService<AnswerFeedbackMessageFile> {
  constructor(
    @InjectModel(AnswerFeedbackMessageFile)
    private readonly fileModel: typeof AnswerFeedbackMessageFile
  ) {
    super(fileModel);
  }
}
