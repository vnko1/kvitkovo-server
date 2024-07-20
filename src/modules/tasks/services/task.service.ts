import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Op } from "sequelize";
import { addMonths } from "date-fns";

import { UserService } from "src/modules/user";

@Injectable()
export class TaskSchedulerService {
  constructor(private readonly userService: UserService) {}

  private async clearExpiredConfirmationCode(): Promise<void> {
    const now = new Date();
    await this.userService.updateUser(
      { confirmationCode: null, confirmationCodeExpiry: null },
      { where: { confirmationCodeExpiry: { [Op.lt]: now } } }
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await this.clearExpiredConfirmationCode();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async hardDeleteUsersAcc() {
    const currentDate = new Date();

    const expStamp = addMonths(currentDate, -12);
    try {
      const users = await this.userService.getAllUsers({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        paranoid: false,
      });
      for (const user of users) {
        if (user.deletedAt < expStamp)
          await this.userService.deleteUser({
            where: { userId: user.userId },
            force: true,
          });
      }
    } catch (error) {
      console.log("🚀 ~ TaskService ~ hardDeleteUsersAcc ~ error:", error);
    }
  }
}
