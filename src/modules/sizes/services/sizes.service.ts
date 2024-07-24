import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { SizeService } from "src/modules/catalog";

import { CreateSizeDto, UpdateSizeDto } from "../dto";

@Injectable()
export class SizesService extends AppService {
  constructor(private readonly instanceService: SizeService) {
    super();
  }

  async createInstance(createInstanceDto: CreateSizeDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  async destroyInstance(sizeId: number) {
    return await this.instanceService.deleteInstance({ where: { sizeId } });
  }

  async updateInstance(sizeId: number, updateInstanceDto: UpdateSizeDto) {
    const instance = await this.instanceService.findInstanceById(sizeId);
    if (!instance) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );

    return await instance.save();
  }

  async getInstance(sizeId: number) {
    return await this.instanceService.findInstanceById(sizeId);
  }

  async getAllInstances() {
    return await this.instanceService.findInstances();
  }
}
