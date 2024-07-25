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
        models: [User, Category, Product, Color, Size, ProductType, Image],
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
  ],
})
export class AppModule {}
