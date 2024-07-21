import { z } from "zod";
import { passwordRegex } from "src/utils";

export const changeResetPasswordSchema = z
  .object({
    verificationCode: z.string({
      required_error: "Verification code is required",
    }),
    password: z
      .string({ required_error: "Password is required" })
      .regex(passwordRegex, "Wrong password format"),
  })
  .required();

export type ChangeResetPasswordDto = z.infer<typeof changeResetPasswordSchema>;
