import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Category, Color, Product, ProductType, Size } from "./models";
import {
  CategoryService,
  ColorService,
  ProductService,
  ProductTypeService,
  SizeService,
} from "./services";

@Module({
  imports: [
    SequelizeModule.forFeature([Category, Product, Color, Size, ProductType]),
  ],
  providers: [
    CategoryService,
    ColorService,
    ProductService,
    ProductTypeService,
    SizeService,
  ],
  exports: [
    CategoryService,
    ColorService,
    ProductService,
    ProductTypeService,
    SizeService,
  ],
})
export class CatalogModule {}
