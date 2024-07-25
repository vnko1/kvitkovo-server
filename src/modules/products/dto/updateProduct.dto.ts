import { z } from "zod";
import { ProductStatusEnum } from "src/types";
export const updateProductSchema = z
  .object({
    title: z.string().optional(),
    alias: z.string().optional(),
    price: z.number().optional(),
    priceWithDiscount: z.number().optional(),
    discount: z.number().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    description: z.string().optional(),
    status: z.nativeEnum(ProductStatusEnum).optional(),
    categoryId: z.number().optional(),
    productTypeId: z.number().optional(),
    colorId: z.number().optional(),
    sizeId: z.number().optional(),
    allowAddToConstructor: z.boolean().optional(),
    available: z.boolean().optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).some((key) => data[key] !== undefined);
    },
    {
      message: "At least one field must be provided.",
      path: [],
    }
  );

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
