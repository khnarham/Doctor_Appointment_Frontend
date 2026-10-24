'use client';

import DoctorDashboard from '@/components/doctor/DoctorDashboard';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';
import { Loader2, AlertCircle } from 'lucide-react';

export default function DoctorDashboardPage() {
  const { data: doctor, isLoading, isError, error } = useDoctorProfile();

  // 1. Loading State
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Loading Doctor Profile...</p>
      </main>
    );
  }

  // 2. Error State
  if (isError || !doctor) {
    return (
      <main className="min-h-screen bg-slate-50/60 flex items-center justify-center p-6">
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 max-w-md w-full text-center shadow-xs">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-slate-900">Doctor Profile Not Found</h3>
          <p className="text-xs text-rose-600 mt-1">
            {error instanceof Error ? error.message : 'Unable to retrieve authenticated doctor ID.'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/60 py-6">
      <DoctorDashboard doctorId={doctor.id} />
    </main>
  );
}