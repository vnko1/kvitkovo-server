import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string({ required_error: '' }),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type RegisterDto = z.infer<typeof registerSchema>;
