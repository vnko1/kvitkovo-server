import { ForbiddenException, Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { ColorService } from "src/modules/catalog";

import { CreateColorDto, UpdateColorDto } from "../dto";

@Injectable()
export class ColorsService extends AppService {
  constructor(private readonly colorsService: ColorService) {
    super();
  }

  async createColor(createInstanceDto: CreateColorDto) {
    return await this.colorsService.createColor(createInstanceDto);
  }

  async destroyColor(colorId: number) {
    return await this.colorsService.deleteColor({ where: { colorId } });
  }

  async updateColor(colorId: number, updateInstanceDto: UpdateColorDto) {
    const category = await this.colorsService.findColorById(colorId);
    if (!category) throw new ForbiddenException();

    Object.keys(updateInstanceDto).forEach(
      (data) => (category[data] = updateInstanceDto[data])
    );

    return await category.save();
  }

  async getColor(colorId: number) {
    return await this.colorsService.findColorById(colorId);
  }

  async getAllColors() {
    return await this.colorsService.findColors();
  }

  async getColorByName(name: string) {
    return this.colorsService.findColor({ where: { name } });
  }
}
