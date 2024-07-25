import { z } from "zod";

export const updateShopSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }).optional(),
    alias: z.string({ required_error: "Alias is required" }).optional(),
    email: z.string().email("Wrong email format").optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
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

export type UpdateShopDto = z.infer<typeof updateShopSchema>;
