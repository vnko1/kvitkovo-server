import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { BaseModule } from './modules';
import { User } from './modules/user/models';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_URL,
        retryAttempts: 2,
        synchronize: true,
        autoLoadModels: true,
        models: [User],
      }),
    }),
    BaseModule,
  ],
})
export class AppModule {}
