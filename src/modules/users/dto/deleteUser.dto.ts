import { z } from "zod";

export const deleteUserSchema = z
  .object({
    forceDelete: z.boolean().optional(),
  })
  .optional();

export type DeleteUserDto = z.infer<typeof deleteUserSchema>;
