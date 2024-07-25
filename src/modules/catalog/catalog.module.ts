import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Category, Color, Product, ProductType, Size, Image } from "./models";
import {
  CategoryService,
  ColorService,
  ProductService,
  ProductTypeService,
  SizeService,
  ImageService,
} from "./services";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Category,
      Product,
      Color,
      Size,
      ProductType,
      Image,
    ]),
  ],
  providers: [
    CategoryService,
    ColorService,
    ProductService,
    ProductTypeService,
    SizeService,
    ImageService,
  ],
  exports: [
    CategoryService,
    ColorService,
    ProductService,
    ProductTypeService,
    SizeService,
    ImageService,
  ],
})
export class CatalogModule {}
