import { z } from 'zod';

export const doctorInvitationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid clinical email address'),
  specialization_id: z
    .string()
    .min(1, 'Please select a specialization department'),
});

export type DoctorInvitationFormValues = z.infer<typeof doctorInvitationSchema>;

export interface SpecializationOption {
  id: string;
  name: string;
}

export interface DoctorInvitationResponse {
  id: string;
  email: string;
  specializationId: string;
  token: string;
  isUsed: boolean;
  expiresAt: string;
  createdAt: string;
}