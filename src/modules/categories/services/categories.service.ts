import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { CategoryService } from "src/modules/catalog";

import { CreateCategoryDto, UpdateCategoryDto } from "../dto";

@Injectable()
export class CategoriesService extends AppService {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  async destroyCategory(categoryId: number) {
    return await this.categoryService.deleteCategory({ where: { categoryId } });
  }

  async updateCategory(
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto
  ) {
    const category = await this.categoryService.findCategoryById(categoryId);
    if (!category) throw new ForbiddenException();

    Object.keys(updateCategoryDto).forEach(
      (data) => (category[data] = updateCategoryDto[data])
    );

    return await category.save();
  }

  async getCategory(categoryId: number) {
    return await this.categoryService.findCategoryById(categoryId);
  }

  async getAllCategories() {
    return await this.categoryService.findCategories();
  }
}
