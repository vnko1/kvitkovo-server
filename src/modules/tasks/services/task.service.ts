import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';

import { UserService } from 'src/modules/user';

@Injectable()
export class TaskSchedulerService {
  constructor(private readonly userService: UserService) {}

  private async clearExpiredConfirmationCode(): Promise<void> {
    const now = new Date();
    await this.userService.updateUser(
      { confirmationCode: null, confirmationCodeExpiry: null },
      { where: { confirmationCodeExpiry: { [Op.lt]: now } } },
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await this.clearExpiredConfirmationCode();
  }
}
