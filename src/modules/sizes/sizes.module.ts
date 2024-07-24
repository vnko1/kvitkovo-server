import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { SizesController } from "./controller";
import { SizesService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [SizesService],
  controllers: [SizesController],
})
export class SizesModule {}
