import * as z from 'zod';
import { TValidationTranslation } from '.';

export const LoginSchema = (t: TValidationTranslation) =>
  z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .min(4, t('Email must be at least 4 characters')),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, t('Password must be at least 6 characters')),
  });

export type TLoginFormSchema = z.infer<ReturnType<typeof LoginSchema>>;
