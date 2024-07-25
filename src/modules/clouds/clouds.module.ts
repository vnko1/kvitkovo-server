import { Module } from "@nestjs/common";

import { CloudsService, CloudsProvider } from ".";

@Module({
  providers: [CloudsProvider, CloudsService],
  exports: [CloudsService],
})
export class CloudsModule {}
