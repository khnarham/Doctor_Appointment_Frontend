import { z } from 'zod';

export const doctorRegistrationSchema = z.object({
  token: z.string().min(1, 'Invitation token is missing or invalid'),
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Please select your gender',
  }),
  license_number: z.string().min(1, 'Medical license number is required'),
  consultation_fee: z
    .number({ invalid_type_error: 'Please enter a valid amount' })
    .gte(0, 'Consultation fee cannot be negative'),
});

export type DoctorRegistrationFormValues = z.infer<typeof doctorRegistrationSchema>;