import { z } from "zod";

import { CategoryIconEnum, CategoryStatusEnum } from "src/types";

export const createSizeSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    metaDescription: z.string({
      required_error: "Meta description is required",
    }),
    metaKeywords: z.string({
      required_error: "Meta keywords is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    status: z.nativeEnum(CategoryStatusEnum, {
      required_error: "Status is required",
    }),
    icon: z.nativeEnum(CategoryIconEnum, {
      required_error: "Icon is required",
    }),
    sortValue: z.coerce.number({
      required_error: "Sort value is required",
    }),
  })
  .required();

export type CreateSizeDto = z.infer<typeof createSizeSchema>;
