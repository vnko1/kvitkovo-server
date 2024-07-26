import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./modules/user";
import {
  Category,
  Color,
  Product,
  ProductType,
  Size,
  Image,
} from "./modules/catalog";
import { Shop } from "./modules/shop";
import {
  CloudsModule,
  TasksModule,
  MailModule,
  UserModule,
  AuthModule,
  UsersModule,
  CatalogModule,
  CategoriesModule,
  ColorsModule,
  SizesModule,
  ProductTypesModule,
  ProductsModule,
  ShopModule,
  ShopsModule,
  DecorModule,
} from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: "mysql",
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        retryAttempts: 2,
        synchronize: true,
        autoLoadModels: true,
        models: [
          User,
          Category,
          Product,
          Color,
          Size,
          ProductType,
          Image,
          Shop,
        ],
      }),
    }),
    MailModule,
    CloudsModule,
    TasksModule,
    UserModule,
    AuthModule,
    UsersModule,
    CatalogModule,
    CategoriesModule,
    ColorsModule,
    SizesModule,
    ProductTypesModule,
    ProductsModule,
    ShopModule,
    ShopsModule,
    DecorModule,
  ],
})
export class AppModule {}
