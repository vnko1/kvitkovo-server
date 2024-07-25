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
  CreateSizeDto,
  createSizeSchema,
  UpdateSizeDto,
  updateSizeSchema,
} from "../dto";
import { SizesService } from "../services";

@Controller("sizes")
export class SizesController {
  constructor(private readonly instanceService: SizesService) {}
  @Post()
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(createSizeSchema))
  async createInstance(@Body() createInstanceDto: CreateSizeDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  @Delete(":sizeId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteInstance(@Param("sizeId", ParseIntPipe) sizeId: number) {
    return await this.instanceService.destroyInstance(sizeId);
  }

  @Put(":sizeId")
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER)
  @UsePipes(new BodyValidationPipe(updateSizeSchema))
  async updateInstance(
    @Param("sizeId", ParseIntPipe) sizeId: number,
    @Body() updateInstanceDto: UpdateSizeDto
  ) {
    return await this.instanceService.updateInstance(sizeId, updateInstanceDto);
  }

  @Get(":sizeId")
  @Public()
  async getInstanceById(@Param("sizeId", ParseIntPipe) sizeId: number) {
    return await this.instanceService.getInstance(sizeId);
  }

  @Get()
  @Public()
  async getInstances() {
    return await this.instanceService.getAllInstances();
  }
}
