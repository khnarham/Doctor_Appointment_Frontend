import { api } from '@/lib/axios';
import { create } from 'zustand';

export type DoctorStatus = 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';

export interface Doctor {
  id: string;
  user_id: string;
  specialization_id: string;
  license_number: string;
  consultation_fee: number;
  status: DoctorStatus;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

interface DoctorStore {
  doctor: Doctor | null;
  isLoading: boolean;
  error: string | null;
  setDoctor: (doctor: Doctor) => void;
  fetchDoctorProfile: () => Promise<void>;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
  doctor: null,
  isLoading: true,
  error: null,

  setDoctor: (doctor) => set({ doctor, isLoading: false, error: null }),

  fetchDoctorProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // Backend Endpoint Call
      const res = await api.get("/auth/doctor");

      if (res.data.success === false){
        throw new Error(res.data.message)
      }

      set({ doctor: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Something went wrong', isLoading: false });
    }
  },
}));