import { z } from "zod";

import { CategoryIconEnum, CategoryStatusEnum } from "src/types";

export const updateProductTypesSchema = z
  .object({
    name: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    description: z.string().optional(),
    status: z.nativeEnum(CategoryStatusEnum).optional(),
    icon: z.nativeEnum(CategoryIconEnum).optional(),
    sortValue: z.coerce.number().optional(),
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

export type UpdateProductTypesDto = z.infer<typeof updateProductTypesSchema>;
