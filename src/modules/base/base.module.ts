import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { BaseService, BaseMiddleware, BaseController } from "src/modules/base";

@Module({
  imports: [],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BaseMiddleware).forRoutes(BaseController);
  }
}
