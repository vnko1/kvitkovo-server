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
import { BodyValidationPipe } from "src/common/pipes";

import {
  CreateShopDto,
  createShopSchema,
  UpdateShopDto,
  updateShopSchema,
} from "../dto";
import { ShopsService } from "../services";

@Controller("shops")
export class ShopsController {
  constructor(private readonly instanceService: ShopsService) {}

  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(createShopSchema))
  async createInstance(@Body() createInstanceDto: CreateShopDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  @Put(":shopId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(updateShopSchema))
  async updateShop(
    @Param("shopId", ParseIntPipe) shopId: number,
    @Body() updateInstanceDto: UpdateShopDto
  ) {
    return await this.instanceService.updateInstance(shopId, updateInstanceDto);
  }

  @Delete(":shopId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteShop(@Param("shopId", ParseIntPipe) shopId: number) {
    return await this.instanceService.deleteInstance(shopId);
  }

  @Get(":shopId")
  @Public()
  async getShop(@Param("shopId", ParseIntPipe) shopId: number) {
    return await this.instanceService.getInstanceById(shopId);
  }

  @Get()
  @Public()
  async getShops() {
    return await this.instanceService.getAllInstances();
  }
}
