import { z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    surName: z.string().optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),
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

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
