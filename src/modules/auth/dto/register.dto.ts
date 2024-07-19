import { passwordRegex } from 'src/utils';
import { z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string({ required_error: 'FirstName is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Wrong format'),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(passwordRegex, 'Wrong password format'),
  })
  .required();

export type RegisterDto = z.infer<typeof registerSchema>;
