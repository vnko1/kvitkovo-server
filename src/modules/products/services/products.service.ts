import { Injectable } from "@nestjs/common";

import { AppService } from "src/common/services";
import { ProductService } from "src/modules/catalog";

@Injectable()
export class ProductsService extends AppService {
  constructor(private readonly instanceService: ProductService) {
    super();
  }
}
