import { z } from "zod";

export const createSizeSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    alias: z.string({ required_error: "Alias is required" }),
    min: z.number({ required_error: "Min is required" }),
    max: z.number({ required_error: "Max is required" }),
  })
  .required();

export type CreateSizeDto = z.infer<typeof createSizeSchema>;
