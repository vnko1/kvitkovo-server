import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Category, Color, Product, ProductType, Size } from "./models";

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product, Color, Size, ProductType]),
  ],
  providers: [],
})
export class CatalogModule {}
