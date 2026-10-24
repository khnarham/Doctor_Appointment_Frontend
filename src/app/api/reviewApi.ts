import { api } from '@/lib/axios';

export interface SubmitReviewPayload {
  patient_id: string;
  appointment_id: string;
  rating: number;
  comment: string;
}

export interface ReviewApiResponse {
  message: string;
}

export async function submitAppointmentReview(payload: SubmitReviewPayload): Promise<ReviewApiResponse> {
  const response = await api.post<ReviewApiResponse>('/appointments/reviews', payload);
  return response.data;
}