import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { QueryDto } from "src/common/dto";

import {
  Category,
  Color,
  ProductService,
  ProductType,
  Size,
} from "src/modules/catalog";

import { CreateProductDto, UpdateProductDto } from "../dto";
import { SortValuesEnum } from "src/types";
import { Op } from "sequelize";

@Injectable()
export class ProductsService extends AppService {
  constructor(private readonly instanceService: ProductService) {
    super();
  }

  private getQueryOpt(queryDto: QueryDto) {
    const {
      offset,
      limit,
      priceFrom,
      priceTo,
      title,
      categories,
      colors,
      sizes,
      types,
      discount,
      sort,
      categoryId,
    } = queryDto;
    const queryOptions: any = {
      offset,
      limit,
      where: {},
      include: [
        { model: Category },
        { model: Color },
        { model: Size },
        { model: ProductType },
        { model: Image },
      ],
    };

    if (priceFrom !== undefined) {
      queryOptions.where.price = { [Op.gte]: priceFrom };
    }

    if (priceTo !== undefined) {
      queryOptions.where.price = {
        ...(queryOptions.where.price || {}),
        [Op.lte]: priceTo,
      };
    }

    if (title) {
      queryOptions.where.title = { [Op.iLike]: `%${title}%` };
    }

    if (categories) {
      queryOptions.where.categoryId = { [Op.in]: categories };
    }

    if (colors) {
      queryOptions.where.colorId = { [Op.in]: colors };
    }

    if (sizes) {
      queryOptions.where.sizeId = { [Op.in]: sizes };
    }

    if (types) {
      queryOptions.where.productTypeId = { [Op.in]: types };
    }

    if (discount !== undefined) {
      queryOptions.where.discount = discount ? { [Op.gt]: 0 } : { [Op.eq]: 0 };
    }

    if (categoryId) {
      queryOptions.where.categoryId = categoryId;
    }

    if (sort) {
      switch (sort) {
        case SortValuesEnum.ASC:
          queryOptions.order = [["price", "ASC"]];
          break;
        case SortValuesEnum.DESC:
          queryOptions.order = [["price", "DESC"]];
          break;

        default:
          break;
      }
    }

    return queryOptions;
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
    return await this.instanceService.findAndCountInstances(
      this.getQueryOpt(queryDto)
    );
  }

  async getDiscountedProducts(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort">
  ) {
    return await this.instanceService.findAndCountInstances(
      this.getQueryOpt(queryDto)
    );
  }

  async getProductsByCategory(
    queryDto: Pick<QueryDto, "limit" | "offset" | "sort" | "categoryId">
  ) {
    return await this.instanceService.findAndCountInstances(
      this.getQueryOpt(queryDto)
    );
  }
}
