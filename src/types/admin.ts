export interface TopDoctor {
  doctor_id: string;
  user_id: string;
  license_number: string;
  consultation_fee: number;
  completed_appointments: number;
  total_earned: number;
}

export interface FinancialOverviewData {
  total_completed_appointments: number;
  total_revenue: number;
  top_earning_doctors: TopDoctor[];
}