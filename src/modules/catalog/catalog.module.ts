import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Category, Product } from "./models";

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])],
  providers: [],
})
export class CatalogModule {}
