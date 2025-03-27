import * as z from 'zod';
import { TValidationTranslation } from '.';

export const LoginSchema = (t: TValidationTranslation) =>
  z.object({
    username: z
      .string({
        required_error: 'Username is required',
      })
      .min(4, t('Username must be at least 4 characters')),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, t('Password must be at least 6 characters')),
  });

export type TLoginFormSchema = z.infer<ReturnType<typeof LoginSchema>>;
