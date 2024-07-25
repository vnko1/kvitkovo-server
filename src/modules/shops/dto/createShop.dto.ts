import { z } from "zod";

export const createShopSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    alias: z.string({ required_error: "Alias is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong email format"),
    phone: z.string({ required_error: "Phone is required" }),
    city: z.string({ required_error: "City is required" }),
    address: z.string({ required_error: "Address is required" }),
  })
  .required();

export type CreateShopDto = z.infer<typeof createShopSchema>;
