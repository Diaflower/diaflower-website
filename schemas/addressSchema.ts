import { z } from 'zod';

export const addressSchema = z.object({
  id: z.number().optional(),
  addressTitle: z.string().min(1, 'Address title is required'),
  title: z.enum(['MR', 'MS', 'MRS']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  country: z.literal('United Arab Emirates'),
  state: z.enum(['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']),
  area: z.string().min(2, 'Area is required'),
  postalCode: z.string().optional(),
  phone: z.string().min(5, 'Phone number is required'),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;