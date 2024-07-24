import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { ColorsController } from "./controller";
import { ColorsService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [ColorsService],
  controllers: [ColorsController],
})
export class ColorsModule {}
