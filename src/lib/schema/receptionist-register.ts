import { z } from 'zod';

export const receptionistRegisterSchema = z
  .object({
    token: z.string().min(1, 'Invitation token is missing or invalid'),
    full_name: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name cannot exceed 100 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type ReceptionistRegisterFormValues = z.infer<typeof receptionistRegisterSchema>;

export interface AcceptInvitationRequest {
  token: string;
  full_name: string;
  password: string;
}