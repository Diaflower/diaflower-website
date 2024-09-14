// schemas/userSchema.ts
import { z } from 'zod';

export const userProfileSchema = z.object({
  title: z.enum(['MR', 'MRS', 'MS']),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dob: z.date().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']).optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredLanguage: z.enum(['ENGLISH', 'ARABIC']),
  newsletterSubscribed: z.boolean(),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;