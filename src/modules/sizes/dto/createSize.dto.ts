import { z } from "zod";

export const createSizeSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
  })
  .required();

export type CreateSizeDto = z.infer<typeof createSizeSchema>;
