import {
  Controller,
  // Body,
  // Delete,
  // Get,
  // HttpCode,
  // HttpStatus,
  // Param,
  // ParseIntPipe,
  // Post,
  // Put,
  // UsePipes,
} from "@nestjs/common";

// import { RolesEnum } from "src/types";

// import { Public, Roles } from "src/common/decorators";
// import { ValidationPipe } from "src/common/pipes";

import {} from "../dto";
import { ProductsService } from "../services";

@Controller("product-types")
export class ProductsController {
  constructor(private readonly instanceService: ProductsService) {}
}
