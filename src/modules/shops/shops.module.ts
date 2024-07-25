import { Module } from "@nestjs/common";

import { ShopModule } from "../shop/shop.module";

import { ShopsService } from "./services";
import { ShopsController } from "./controller";

@Module({
  imports: [ShopModule],
  providers: [ShopsService],
  controllers: [ShopsController],
})
export class ShopsModule {}
