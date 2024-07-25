import { Injectable } from "@nestjs/common";
import { AppService } from "src/common/services";
import { ShopService } from "src/modules/shop/services";
import { CreateShopDto, UpdateShopDto } from "../dto";

@Injectable()
export class ShopsService extends AppService {
  constructor(private readonly instanceService: ShopService) {
    super();
  }

  async createInstance(createInstance: CreateShopDto) {
    return await this.instanceService.createInstance(createInstance);
  }

  async updateInstance(shopId: number, updateInstance: UpdateShopDto) {
    const instance = await this.instanceService.findInstanceById(shopId);

    Object.keys(updateInstance).forEach(
      (data) => (instance[data] = updateInstance[data])
    );

    return await instance.save();
  }

  async deleteInstance(shopId: number) {
    return await this.instanceService.deleteInstance({ where: { shopId } });
  }

  async getInstanceById(shopId: number) {
    return await this.instanceService.findInstanceById(shopId);
  }

  async getAllInstances() {
    return await this.instanceService.findInstances();
  }
}
