import { z } from "zod";

export const updateSizeSchema = z
  .object({
    name: z.string().optional(),
    alias: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
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

export type UpdateSizeDto = z.infer<typeof updateSizeSchema>;
