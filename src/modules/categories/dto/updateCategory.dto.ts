import { CategoryIconEnum, CategoryStatusEnum } from "src/types";
import { z } from "zod";

export const updateCategorySchema = z
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

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
