import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";

import { RolesEnum } from "src/types";

import { Public, Roles } from "src/common/decorators";
import { ValidationPipe } from "src/common/pipes";

import {
  CreateColorDto,
  createColorSchema,
  UpdateColorDto,
  updateColorSchema,
} from "../dto";
import { ColorsService } from "../services";

@Controller("colors")
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}
  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(createColorSchema))
  async createInstance(@Body() createInstanceDto: CreateColorDto) {
    return await this.colorsService.createInstance(createInstanceDto);
  }

  @Delete(":colorId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteInstance(@Param("colorId", ParseIntPipe) colorId: number) {
    return await this.colorsService.destroyInstance(colorId);
  }

  @Put(":colorId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(updateColorSchema))
  async updateInstance(
    @Param("colorId", ParseIntPipe) colorId: number,
    @Body() updateInstanceDto: UpdateColorDto
  ) {
    return await this.colorsService.updateInstance(colorId, updateInstanceDto);
  }

  @Get(":colorId")
  @Public()
  async getInstanceById(@Param("colorId", ParseIntPipe) colorId: number) {
    return await this.colorsService.getInstance(colorId);
  }

  @Get("name/:name")
  @Public()
  async getInstanceByName(@Param("name") name: string) {
    return await this.colorsService.getInstanceByName(name);
  }

  @Get()
  @Public()
  async getAllInstances() {
    return await this.colorsService.getAllInstances();
  }
}
