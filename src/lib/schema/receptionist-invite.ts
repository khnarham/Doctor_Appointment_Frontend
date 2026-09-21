import { z } from 'zod';

export const receptionistInviteSchema = z.object({
  email: z.string().email('Valid email address is required'),
});

export type ReceptionistInviteFormValues = z.infer<typeof receptionistInviteSchema>;

export interface InviteReceptionistRequest {
  doctor_id: string;
  email: string;
}