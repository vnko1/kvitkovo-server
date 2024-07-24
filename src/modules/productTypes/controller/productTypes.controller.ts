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
  CreateProductTypesDto,
  createProductTypesSchema,
  UpdateProductTypesDto,
  updateProductTypesSchema,
} from "../dto";
import { ProductTypesService } from "../services";

@Controller("product-types")
export class ProductTypesController {
  constructor(private readonly instanceService: ProductTypesService) {}
  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(createProductTypesSchema))
  async createInstance(@Body() createInstanceDto: CreateProductTypesDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  @Delete(":productTypeId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteInstance(
    @Param("productTypeId", ParseIntPipe) productTypeId: number
  ) {
    return await this.instanceService.destroyInstance(productTypeId);
  }

  @Put(":productTypeId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(updateProductTypesSchema))
  async updateInstance(
    @Param("productTypeId", ParseIntPipe) productTypeId: number,
    @Body() updateInstanceDto: UpdateProductTypesDto
  ) {
    return await this.instanceService.updateInstance(
      productTypeId,
      updateInstanceDto
    );
  }

  @Get(":productTypeId")
  @Public()
  async getInstanceById(
    @Param("productTypeId", ParseIntPipe) productTypeId: number
  ) {
    return await this.instanceService.getInstance(productTypeId);
  }

  @Get()
  @Public()
  async getInstances() {
    return await this.instanceService.getAllInstances();
  }
}
