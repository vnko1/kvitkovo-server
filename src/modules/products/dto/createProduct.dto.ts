import { z } from "zod";

import { ProductStatusEnum } from "src/types";

export const createProductSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  alias: z.string({ required_error: "Alias is required" }),
  price: z.number({
    required_error: "Price is required",
  }),
  priceWithDiscount: z.number({
    required_error: "Price with discount is required",
  }),
  discount: z.number({
    required_error: "Discount is required",
  }),
  metaDescription: z.string({
    required_error: "Meta description is required",
  }),
  metaKeywords: z.string({
    required_error: "Meta keyword is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  status: z.nativeEnum(ProductStatusEnum, {
    required_error: "Description is required",
  }),
  categoryId: z.number({
    required_error: "CategoryId is required",
  }),
  productTypeId: z.number({
    required_error: "ProductTypeId is required",
  }),
  colorId: z.number({
    required_error: "ColorId is required",
  }),
  sizeId: z.number({
    required_error: "SizeId is required",
  }),
  allowAddToConstructor: z.boolean({
    required_error: "AllowAddToConstructor is required",
  }),
  available: z.boolean({ message: "Available" }).optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
