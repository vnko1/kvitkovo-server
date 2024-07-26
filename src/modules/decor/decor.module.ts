import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([])],
  providers: [],
  exports: [],
})
export class DecorModule {}
