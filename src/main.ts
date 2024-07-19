import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { AppHttpExceptionFilter } from "./common/exceptions";
import {
  ClearDataInterceptor,
  TransformResponseInterceptor,
} from "./common/interceptors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new AppHttpExceptionFilter());
  app.useGlobalInterceptors(new ClearDataInterceptor());
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
