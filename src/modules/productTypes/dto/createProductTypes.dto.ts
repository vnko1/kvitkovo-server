import { z } from "zod";

export const createProductTypesSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    alias: z.string({ required_error: "Alias is required" }),
  })
  .required();

export type CreateProductTypesDto = z.infer<typeof createProductTypesSchema>;
