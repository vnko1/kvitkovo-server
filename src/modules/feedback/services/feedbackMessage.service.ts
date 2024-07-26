import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { InstanceService } from "src/common/services";

import { FeedbackMessage } from "../models";

@Injectable()
export class FeedbackMessageService extends InstanceService<FeedbackMessage> {
  constructor(
    @InjectModel(FeedbackMessage)
    private readonly feedModel: typeof FeedbackMessage
  ) {
    super(feedModel);
  }
}
