export interface DoctorAnalyticsSummary {
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  cancelled_appointments: number;
  total_earnings: number;
  unique_patients_count: number;
}

export interface DoctorPatientDetail {
  appointment_id: string;
  patient_id: string;
  patient_name: string;
  patient_phone: string;
  is_walk_in: boolean;
  gender: string;
  date_of_birth: string;
  appointment_date: string;
  start_time: number;
  end_time: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface DoctorDashboardResponse {
  summary: DoctorAnalyticsSummary;
  recent_patients: DoctorPatientDetail[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}