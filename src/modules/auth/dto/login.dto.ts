import { z } from "zod";
import { passwordRegex } from "src/utils";

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong format"),
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, "Wrong password format"),
  })
  .required();

export type LoginDto = z.infer<typeof loginSchema>;
