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
  CreateCategoryDto,
  createCategorySchema,
  UpdateCategoryDto,
  updateCategorySchema,
} from "../dto";
import { CategoriesService } from "../services";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(createCategorySchema))
  async createCategory(@Body() createInstanceDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createInstanceDto);
  }

  @Delete(":categoryId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return await this.categoriesService.destroyCategory(categoryId);
  }

  @Put(":categoryId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(updateCategorySchema))
  async updateCategory(
    @Param("categoryId", ParseIntPipe) categoryId: number,
    @Body() updateInstanceDto: UpdateCategoryDto
  ) {
    return await this.categoriesService.updateCategory(
      categoryId,
      updateInstanceDto
    );
  }

  @Get(":categoryId")
  @Public()
  async getCategoryById(@Param("categoryId", ParseIntPipe) categoryId: number) {
    return await this.categoriesService.getCategory(categoryId);
  }

  @Get()
  @Public()
  async getCategories() {
    return await this.categoriesService.getAllCategories();
  }
}
