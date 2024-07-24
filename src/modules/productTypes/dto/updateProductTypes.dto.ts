import { z } from "zod";

export const updateProductTypesSchema = z
  .object({
    name: z.string().optional(),
    alias: z.string().optional(),
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
