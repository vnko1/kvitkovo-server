import { z } from "zod";
import { passwordRegex } from "src/utils";

export const updateEmployeesSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    surName: z.string().optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),
    password: z
      .string()
      .regex(passwordRegex, "Wrong password format")
      .optional(),
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

export type UpdateEmployeesDto = z.infer<typeof updateEmployeesSchema>;
