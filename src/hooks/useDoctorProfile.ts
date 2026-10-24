import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export interface Doctor {
  id: string;
  user_id: string;
  specialization_id: string;
  license_number: string;
  consultation_fee: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

async function fetchDoctorProfile(): Promise<Doctor> {
  try {
    const res = await api.get("/auth/doctor");

    if (res.data.success === false) {
      throw new Error(res.data.message || "Failed to get the doctor");
    }

    return res.data.data;
  } catch (error: any) {
    const serverMessage = error.response?.data?.message || error.message || "Failed to fetch doctor profile";
    throw new Error(serverMessage);
  }
}

export function useDoctorProfile() {
  return useQuery({
    queryKey: ['doctor', 'profile'],
    queryFn: fetchDoctorProfile,
    staleTime: 1000 * 60 * 15, // 15 Minutes
    gcTime: 1000 * 60 * 60,    // 1 Hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
}