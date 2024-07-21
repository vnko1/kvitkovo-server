import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .email("Wrong email format");

export type EmailDto = z.infer<typeof emailSchema>;
