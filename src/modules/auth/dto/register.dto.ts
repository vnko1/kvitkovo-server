import { z } from "zod";
import { passwordRegex } from "src/utils";

export const registerSchema = z
  .object({
    firstName: z.string({ required_error: "FirstName is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong format"),
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, "Wrong password format"),
  })
  .required();

export type RegisterDto = z.infer<typeof registerSchema>;
