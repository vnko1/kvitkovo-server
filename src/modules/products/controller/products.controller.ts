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
  UsePipes,
} from "@nestjs/common";

import { RolesEnum } from "src/types";

import {  Roles } from "src/common/decorators";


import {} from "../dto";
import { ProductsService, ImagesService } from "../services";


@Controller("products")
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imagesService: ImagesService
  ) { }

  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @Post()
}
