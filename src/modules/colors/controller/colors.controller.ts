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
  async createCategory(@Body() createInstanceDto: CreateColorDto) {
    return await this.colorsService.createColor(createInstanceDto);
  }

  @Delete(":colorId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param("colorId", ParseIntPipe) colorId: number) {
    return await this.colorsService.destroyColor(colorId);
  }

  @Put(":colorId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(updateColorSchema))
  async updateCategory(
    @Param("colorId", ParseIntPipe) colorId: number,
    @Body() updateInstanceDto: UpdateColorDto
  ) {
    return await this.colorsService.updateColor(colorId, updateInstanceDto);
  }

  @Get(":colorId")
  @Public()
  async getCategoryById(@Param("colorId", ParseIntPipe) colorId: number) {
    return await this.colorsService.getColor(colorId);
  }

  @Get("name/:name")
  @Public()
  async getColorByName(@Param("name") name: string) {
    return await this.colorsService.getColorByName(name);
  }

  @Get()
  @Public()
  async getAllColors() {
    return await this.colorsService.getAllColors();
  }
}
