import {
  Controller,
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UsePipes,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import { RolesEnum } from "src/types";
import { multerConfig } from "src/utils";

import { ValidationPipe } from "src/common/pipes";
import { QueryDto } from "src/common/dto";
import { Roles } from "src/common/decorators";

import { ProductsService, ImagesService } from "../services";
import {
  CreateImageDto,
  createImageSchema,
  CreateProductDto,
  createProductSchema,
  UpdateProductDto,
  updateProductSchema,
} from "../dto";

@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService
  ) {}

  @Post("product")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(createProductSchema))
  async createProduct(@Body() createInstanceDto: CreateProductDto) {
    return await this.productsService.createProduct(createInstanceDto);
  }

  @Delete("product/:productId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param("productId", ParseIntPipe) productId: number) {
    return await this.productsService.deleteProduct(productId);
  }

  @Put("product/:productId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new ValidationPipe(updateProductSchema))
  async updateProduct(
    @Param("productId", ParseIntPipe) productId: number,
    @Body() updateInstanceDto: UpdateProductDto
  ) {
    return await this.productsService.updateProduct(
      productId,
      updateInstanceDto
    );
  }

  @Put("product/:productId/status")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  async updateProductStatus(
    @Param("productId", ParseIntPipe) productId: number
  ) {
    return await this.productsService.toggleProductStatus(productId);
  }

  @Get("product/:productId")
  async getProductBtId(@Param("productId", ParseIntPipe) productId: number) {
    return await this.productsService.getProduct(productId);
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get("filter")
  async getFilteredProducts(@Query() query: QueryDto) {
    return await this.productsService.getFilteredProducts(query);
  }

  @Get("discounted")
  async getDiscountedProducts(@Query() query: QueryDto) {
    return await this.productsService.getDiscountedProducts(query);
  }

  @Get("category")
  async getProductsByCategory(@Query() query: QueryDto) {
    return await this.productsService.getProductsByCategory(query);
  }

  @Post("images")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UseInterceptors(
    FileInterceptor("file", { storage: diskStorage(multerConfig) })
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createInstance: CreateImageDto
  ) {
    const parsedSchema = createImageSchema.safeParse({
      ...createInstance,
      file,
    });

    if (!parsedSchema.success)
      throw new BadRequestException(parsedSchema.error.errors[0].message);

    return await this.imagesService.createInstance(parsedSchema.data);
  }

  @Put("images/:imageId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  async setMain(@Param("imageId", ParseIntPipe) imageId: number) {
    return await this.imagesService.toggleMainImage(imageId);
  }

  @Delete(":productId/images")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async productId(@Param("productId", ParseIntPipe) productId: number) {
    return await this.imagesService.deleteAllProductsImages(productId);
  }

  @Delete("/images/:imageId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param("imageId", ParseIntPipe) imageId: number) {
    return await this.imagesService.deleteImage(imageId);
  }

  @Get(":productId/images")
  async getAllProductImages(
    @Param("productId", ParseIntPipe) productId: number
  ) {
    return await this.imagesService.getProductImages(productId);
  }

  @Get("/images/:imageId")
  async getImage(@Param("imageId", ParseIntPipe) imageId: number) {
    return await this.imagesService.getImage(imageId);
  }
}
