import { Module } from "@nestjs/common";

import { MailModule, UserModule } from "..";

import { UsersService } from "./services";
import { UsersController } from "./controller";

@Module({
  imports: [UserModule, MailModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
