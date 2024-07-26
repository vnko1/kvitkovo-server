import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { CategoryService } from "src/modules/catalog";

import { CreateCategoryDto, UpdateCategoryDto } from "../dto";

@Injectable()
export class CategoriesService extends AppService {
  constructor(private readonly instanceService: CategoryService) {
    super();
  }

  async createInstance(createInstanceDto: CreateCategoryDto) {
    return await this.instanceService.add(createInstanceDto);
  }

  async destroyInstance(categoryId: number) {
    return await this.instanceService.delete({ where: { categoryId } });
  }

  async updateInstance(
    categoryId: number,
    updateInstanceDto: UpdateCategoryDto
  ) {
    const instance = await this.instanceService.findByPk(categoryId);
    if (!instance) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );

    return await instance.save();
  }

  async getInstance(categoryId: number) {
    return await this.instanceService.findByPk(categoryId);
  }

  async getAllInstances() {
    return await this.instanceService.findAll();
  }
}
