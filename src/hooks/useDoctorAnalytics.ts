import { api } from '@/lib/axios';
import { ApiResponse, DoctorDashboardResponse } from '@/types/doctor_analytics';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDoctorAnalytics = async (doctorId: string): Promise<DoctorDashboardResponse> => {
  const { data } = await api.get<ApiResponse<DoctorDashboardResponse>>(
    `/appointments/doctors/dashboard/analytics/${doctorId}`
  );
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch dashboard analytics');
  }

  return data.data;
};

export const useDoctorAnalytics = (doctorId: string) => {
  return useQuery({
    queryKey: ['doctor-analytics', doctorId],
    queryFn: () => fetchDoctorAnalytics(doctorId),
    enabled: Boolean(doctorId), // Query tab tak run nahi hogi jab tak doctorId present na ho
    staleTime: 1000 * 60 * 5,   // 5 minutes tak cache fresh rahegi
    refetchOnWindowFocus: true, // App tab focus hone par background sync
  });
};