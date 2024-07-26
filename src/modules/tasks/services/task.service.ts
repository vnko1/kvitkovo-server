import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Op } from "sequelize";
import { addMonths } from "date-fns";

import { UserService } from "src/modules/user";

@Injectable()
export class TaskSchedulerService {
  constructor(private readonly userService: UserService) {}

  private async clearExpiredVerificationCode(): Promise<void> {
    const now = new Date();
    await this.userService.edit(
      { verificationCode: null, verificationCodeExpiry: null },
      { where: { verificationCodeExpiry: { [Op.lt]: now } } }
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await this.clearExpiredVerificationCode();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async hardDeleteUsersAcc() {
    const currentDate = new Date();

    const expStamp = addMonths(currentDate, -12);
    try {
      const users = await this.userService.findAll({
        where: {
          deletedAt: {
            [Op.ne]: null,
          },
        },
        paranoid: false,
      });
      for (const user of users) {
        if (user.deletedAt < expStamp)
          await this.userService.delete({
            where: { userId: user.userId },
            force: true,
          });
      }
    } catch (error) {
      console.log("🚀 ~ TaskService ~ hardDeleteUsersAcc ~ error:", error);
    }
  }
}
