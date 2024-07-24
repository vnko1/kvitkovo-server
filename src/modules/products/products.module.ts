import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { ProductsController } from "./controller";
import { ProductsService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
