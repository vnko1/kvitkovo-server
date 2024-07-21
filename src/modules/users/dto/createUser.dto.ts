import { z } from "zod";

import { ProviderEnum, RolesEnum, StatusEnum } from "src/types";

export const createUserSchema = z
  .object({
    firstName: z.string({ required_error: "FirstName is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Wrong format"),
    status: z.nativeEnum(StatusEnum, { required_error: "Status is required" }),
    emailConfirmed: z.boolean({
      required_error: "Email confirmed is required",
    }),
    roles: z.nativeEnum(RolesEnum, { required_error: "Roles is required" }),
    provider: z.nativeEnum(ProviderEnum, {
      required_error: "Provider is required",
    }),
    lastName: z.string().optional(),
    surName: z.string().optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),
    comment: z.string().optional(),
    newsletter: z.boolean().optional(),
  })
  .required({
    firstName: true,
    email: true,
    status: true,
    emailConfirmed: true,
    roles: true,
    provider: true,
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
