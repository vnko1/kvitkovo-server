import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong format"),
    password: z.string({ required_error: "Password is required" }),
  })
  .required();

export type LoginDto = z.infer<typeof loginSchema>;
