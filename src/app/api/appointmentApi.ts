import { api } from '@/lib/axios';
import { Appointment, AppointmentsApiResponse } from '@/types/appointment';

export async function fetchPatientAppointments(patientId: string): Promise<Appointment[]> {
  if (!patientId) return [];

  const res = await api.get<AppointmentsApiResponse>(`/appointments/my-appointment/${patientId}`);
  
  if (!res.data?.data) {
    throw new Error('Failed to load appointments data');
  }

  return res.data.data;
}