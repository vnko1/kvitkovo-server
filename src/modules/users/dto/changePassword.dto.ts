import { z } from "zod";
import { passwordRegex } from "src/utils";

export const changePasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, "Wrong password format"),
  })
  .required();

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
