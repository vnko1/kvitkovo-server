import { z } from "zod";

export const resetCodeSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong format"),
  })
  .required();

export type ResetCodeDto = z.infer<typeof resetCodeSchema>;
