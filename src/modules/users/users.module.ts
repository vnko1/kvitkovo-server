import { Module } from "@nestjs/common";

import { UserModule } from "..";

import { UsersService } from "./services";
import { UsersController } from "./controller";

@Module({
  imports: [UserModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
