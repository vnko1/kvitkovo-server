import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { UserModule } from "../user/user.module";

import { TaskSchedulerService } from "./services";

@Module({
  imports: [ScheduleModule.forRoot(), UserModule],
  providers: [TaskSchedulerService],
})
export class TasksModule {}
