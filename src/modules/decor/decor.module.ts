import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Decor } from "./models";
import { DecorService } from "./services";

@Module({
  imports: [SequelizeModule.forFeature([Decor])],
  providers: [DecorService],
  exports: [DecorService],
})
export class DecorModule {}
