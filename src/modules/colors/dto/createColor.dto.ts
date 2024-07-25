import { z } from "zod";

export const createColorSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    alias: z.string({ required_error: "Alias is required" }),
  })
  .required();

export type CreateColorDto = z.infer<typeof createColorSchema>;
