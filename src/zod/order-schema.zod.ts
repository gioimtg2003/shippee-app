import * as z from 'zod';
import { TValidationTranslation } from '.';

export const OrderSchema = (t: TValidationTranslation) =>
  z.object({
    cusName: z.string({
      required_error: t('Customer name is required'),
    }),
    cusPhone: z
      .string({
        required_error: 'Customer Phone is required',
      })
      .regex(
        new RegExp(
          '^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$'
        ),
        t('Customer Phone is invalid')
      ),
    pickup: z
      .object({
        address: z.string({
          required_error: t('Pickup address is required'),
        }),
        addressDetail: z.string().optional().or(z.literal('')),
        coordinates: z
          .array(z.number(), {
            required_error: t('Pickup coordinates is required'),
          })
          .length(2, t('Pickup coordinates is invalid')),
      })
      .required(),
    recipientName: z.string({
      required_error: t('Recipient name is required'),
    }),
    recipientPhone: z
      .string({
        required_error: 'Recipient Phone is required',
      })
      .regex(
        new RegExp(
          '^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$'
        ),
        t('Customer Phone is invalid')
      ),
    destination: z
      .object({
        address: z.string({
          required_error: t('Pickup address is required'),
        }),
        addressDetail: z.string().optional().or(z.literal('')),
        coordinates: z
          .array(z.number(), {
            required_error: t('Pickup coordinates is required'),
          })
          .length(2, t('Pickup coordinates is invalid')),
      })
      .required(),
  });

export type TOrderFormSchema = z.infer<ReturnType<typeof OrderSchema>>;
