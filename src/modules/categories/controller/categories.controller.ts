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
import { BodyValidationPipe } from "src/common/pipes";

import {
  CreateCategoryDto,
  createCategorySchema,
  UpdateCategoryDto,
  updateCategorySchema,
} from "../dto";
import { CategoriesService } from "../services";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly instanceService: CategoriesService) {}
  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(createCategorySchema))
  async createInstance(@Body() createInstanceDto: CreateCategoryDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  @Delete(":categoryId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteInstance(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return await this.instanceService.destroyInstance(categoryId);
  }

  @Put(":categoryId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(updateCategorySchema))
  async updateInstance(
    @Param("categoryId", ParseIntPipe) categoryId: number,
    @Body() updateInstanceDto: UpdateCategoryDto
  ) {
    return await this.instanceService.updateInstance(
      categoryId,
      updateInstanceDto
    );
  }

  @Get(":categoryId")
  @Public()
  async getInstanceById(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return await this.instanceService.getInstance(categoryId);
  }

  @Get()
  @Public()
  async getInstances() {
    return await this.instanceService.getAllInstances();
  }
}
