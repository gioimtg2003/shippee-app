import * as z from 'zod';
import { TValidationTranslation } from '.';

export const OrderSchema = (t: TValidationTranslation) =>
  z.object({
    cusName: z
      .string({
        required_error: 'Customer name is required',
      })
      .min(4, t('Customer name must be at least 4 characters')),
    pickup: z.object({
      address: z
        .string()
        .min(4, t('Pickup address must be at least 4 characters')),
      coordinates: z
        .array(z.number())
        .length(2, t('Invalid pickup coordinates')),
    }),
    cusPhone: z
      .string()
      .min(10, t('Customer phone must be at least 10 characters')),
    recipientName: z
      .string()
      .min(4, t('Recipient name must be at least 4 characters')),
    recipientPhone: z
      .string()
      .min(10, t('Recipient phone must be at least 10 characters')),
    destination: z.object({
      address: z
        .string()
        .min(4, t('Destination address must be at least 4 characters')),
      coordinates: z
        .array(z.number())
        .length(2, t('Invalid destination coordinates')),
    }),
    transportTypeId: z.number({
      required_error: 'Transport type is required',
    }),
    note: z.string().max(500, t('Note must be at most 500 characters')),
  });

export type TOrderFormSchema = z.infer<ReturnType<typeof OrderSchema>>;
