import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { ColorService } from "src/modules/catalog";

import { CreateColorDto, UpdateColorDto } from "../dto";

@Injectable()
export class ColorsService extends AppService {
  constructor(private readonly instanceService: ColorService) {
    super();
  }

  async createInstance(createInstanceDto: CreateColorDto) {
    return await this.instanceService.createInstance(createInstanceDto);
  }

  async destroyInstance(colorId: number) {
    return await this.instanceService.deleteInstance({ where: { colorId } });
  }

  async updateInstance(colorId: number, updateInstanceDto: UpdateColorDto) {
    const instance = await this.instanceService.findInstanceById(colorId);
    if (!instance) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );

    return await instance.save();
  }

  async getInstance(colorId: number) {
    return await this.instanceService.findInstanceById(colorId);
  }

  async getAllInstances() {
    return await this.instanceService.findInstances();
  }

  async getInstanceByName(name: string) {
    return this.instanceService.findInstance({ where: { name } });
  }
}
