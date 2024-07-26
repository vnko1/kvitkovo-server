import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  OrderItemCompositionService,
  OrderItemService,
  OrderService,
} from "./services";

@Module({
  imports: [SequelizeModule.forFeature([])],
  providers: [OrderService, OrderItemService, OrderItemCompositionService],
  exports: [OrderService, OrderItemService, OrderItemCompositionService],
})
export class OrderModule {}
