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
    return await this.instanceService.add(createInstanceDto);
  }

  async destroyInstance(colorId: number) {
    return await this.instanceService.delete({ where: { colorId } });
  }

  async updateInstance(colorId: number, updateInstanceDto: UpdateColorDto) {
    const instance = await this.instanceService.findByPk(colorId);
    if (!instance) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (instance[data] = updateInstanceDto[data])
    );

    return await instance.save();
  }

  async getInstance(colorId: number) {
    return await this.instanceService.findByPk(colorId);
  }

  async getAllInstances() {
    return await this.instanceService.findAll();
  }

  async getInstanceByName(name: string) {
    return this.instanceService.findOne({ where: { name } });
  }
}
