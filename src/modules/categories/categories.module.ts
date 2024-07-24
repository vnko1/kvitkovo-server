import { Module } from "@nestjs/common";

import { CatalogModule } from "..";

import { CategoriesController } from "./controller";
import { CategoriesService } from "./services";

@Module({
  imports: [CatalogModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
