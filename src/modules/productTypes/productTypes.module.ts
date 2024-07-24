import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { ProductTypesController } from "./controller";
import { ProductTypesService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [ProductTypesService],
  controllers: [ProductTypesController],
})
export class ProductTypesModule {}
