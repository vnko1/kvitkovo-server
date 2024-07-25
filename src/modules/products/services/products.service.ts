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
    return createInstanceDto;
  }

  async updateProduct(productId: number, updateInstanceDto: UpdateProductDto) {
    return { updateInstanceDto, productId };
  }

  async toggleProductStatus(productId: number) {
    return productId;
  }

  async deleteProduct(productId: number) {
    return productId;
  }

  async getProduct(productId: number) {
    return productId;
  }

  async getAllProducts() {
    return 1;
  }

  async getFilteredProducts(queryDto: QueryDto) {
    return queryDto;
  }

  async getDiscountedProducts(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort">
  ) {
    return queryDto;
  }

  async getProductsByCategory(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort" | "categoryId">
  ) {
    return queryDto;
  }
}
