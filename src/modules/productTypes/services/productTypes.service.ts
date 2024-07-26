import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { ProductTypeService } from "src/modules/catalog";

import { CreateProductTypesDto, UpdateProductTypesDto } from "../dto";

@Injectable()
export class ProductTypesService extends AppService {
  constructor(private readonly instanceService: ProductTypeService) {
    super();
  }

  async createInstance(createInstanceDto: CreateProductTypesDto) {
    return await this.instanceService.add(createInstanceDto);
  }

  async destroyInstance(productTypeId: number) {
    return await this.instanceService.delete({
      where: { productTypeId },
    });
  }

  async updateInstance(
    productTypeId: number,
    updateInstanceDto: UpdateProductTypesDto
  ) {
    const instance = await this.instanceService.findByPk(productTypeId);
    if (!instance) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );

    return await instance.save();
  }

  async getInstance(productTypeId: number) {
    return await this.instanceService.findByPk(productTypeId);
  }

  async getAllInstances() {
    return await this.instanceService.findAll();
  }
}
