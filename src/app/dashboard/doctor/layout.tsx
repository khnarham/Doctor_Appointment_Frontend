'use client';

import { useDoctorProfile } from '@/hooks/useDoctorProfile';
import { AlertTriangle } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isError, error ,data } = useDoctorProfile();
  console.log("doctor ka lora",data)

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white border border-rose-200 rounded-2xl p-6 text-center max-w-md shadow-sm space-y-3">
          <div className="h-10 w-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Medical Identity Error</h3>
          <p className="text-xs text-slate-500">{error?.message || 'Failed to resolve doctor entity'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {children}
    </div>
  );
}