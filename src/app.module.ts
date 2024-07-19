import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule, AuthModule } from './modules';
import { User } from './modules/user';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
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
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
