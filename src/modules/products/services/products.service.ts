import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { QueryDto } from "src/common/dto";

import { ProductService } from "src/modules/catalog";

import { CreateProductDto, UpdateProductDto } from "../dto";

@Injectable()
export class ProductsService extends AppService {
  constructor(private readonly instanceService: ProductService) {
    super();
  }

  async createProduct(createInstanceDto: CreateProductDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  async updateProduct(productId: number, updateInstanceDto: UpdateProductDto) {
    const instance = await this.instanceService.findInstanceById(productId);

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );
    return await instance.save();
  }

  async toggleProductStatus(productId: number) {
    const instance = await this.instanceService.findInstanceById(productId);
    instance.available = !instance.available;
    return await instance.save();
  }

  async deleteProduct(productId: number) {
    return await this.instanceService.deleteInstance({ where: { productId } });
  }

  async getProduct(productId: number) {
    return await this.instanceService.findInstanceById(productId);
  }

  async getAllProducts() {
    return await this.instanceService.findInstances();
  }

  async getFilteredProducts(queryDto: QueryDto) {
    return await this.instanceService.findAndCountInstances();
  }

  async getDiscountedProducts(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort">
  ) {
    return await this.instanceService.findAndCountInstances();
  }

  async getProductsByCategory(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort" | "categoryId">
  ) {
    return await this.instanceService.findAndCountInstances();
  }
}
