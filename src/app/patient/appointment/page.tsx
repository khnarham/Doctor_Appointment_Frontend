'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Loader2, AlertCircle, ShieldAlert } from 'lucide-react';
import { Header } from '@/components/appointment/Header';
import PatientAppointmentsList from '@/components/appointment/PatientAppointmentsList';

export interface PatientProfile {
  id: string;
  user_id?: string;
  walk_in_name?: string;
  walk_in_phone?: string;
}

async function fetchCurrentPatient(): Promise<PatientProfile | null> {
  const res = await api.get('/auth/patients/me');
  return res.data?.data || null;
}

export default function AppointmentsPage() {
  const {
    data: patient,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['current-patient'],
    queryFn: fetchCurrentPatient,
    staleTime: 1000 * 60 * 10,
  });

  console.log("patient3.0" , patient)

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      {/* Header Bar */}
      <Header
        userName={patient?.walk_in_name || 'Patient'} 
        userRole="Patient Portal" 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
            <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
            <p className="text-xs font-bold text-slate-500">Loading your profile...</p>
          </div>
        ) : isError ? (
          <div className="max-w-7xl mx-auto p-6 mt-6">
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-xs font-semibold">
                {(error as Error)?.message || 'Failed to authenticate current patient.'}
              </p>
            </div>
          </div>
        ) : !patient?.id ? (
          <div className="max-w-7xl mx-auto p-6 mt-6">
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
              <ShieldAlert className="h-10 w-10 text-amber-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">Patient Profile Missing</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active patient account was found associated with this login session.
              </p>
            </div>
          </div>
        ) : (
          <PatientAppointmentsList patientId={patient.id} />
        )}
      </main>
    </div>
  );
}