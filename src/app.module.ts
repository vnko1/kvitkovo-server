import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./modules/user";
import {
  UserModule,
  AuthModule,
  TasksModule,
  MailModule,
  UsersModule,
  CatalogModule,
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
        models: [User],
      }),
    }),
    MailModule,
    TasksModule,
    UserModule,
    AuthModule,
    UsersModule,
    CatalogModule,
  ],
})
export class AppModule {}
