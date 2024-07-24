import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { ProductsController } from "./controller";
import { ProductsService, ImagesService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [ProductsService, ImagesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
