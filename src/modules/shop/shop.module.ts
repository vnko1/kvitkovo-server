import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Shop } from "./models";
import { ShopService } from "./services";

@Module({
  imports: [SequelizeModule.forFeature([Shop])],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
