export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  schedule_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
}

export interface AppointmentsApiResponse {
  message: string;
  data: Appointment[];
}







export interface DoctorAppointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  schedule_id: string;
  date: string;
  start_time: number | string; 
  end_time: number | string;  
  status: AppointmentStatus;
}