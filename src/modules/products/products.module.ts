import { Module } from "@nestjs/common";

import { CatalogModule, CloudsModule } from "..";

import { ProductsController } from "./controller";
import { ProductsService, ImagesService } from "./services";

@Module({
  imports: [CatalogModule, CloudsModule],
  providers: [ProductsService, ImagesService],
  controllers: [ProductsController],
})
export class ProductsModule {}
