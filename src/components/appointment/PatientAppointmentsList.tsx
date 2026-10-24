'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentFilters } from './AppointmentFilters';
import { AppointmentListSkeleton } from './AppointmentListSkeleton';
import { CalendarX2, AlertCircle } from 'lucide-react';
import { fetchPatientAppointments } from '@/app/api/appointmentApi';

interface PatientAppointmentsProps {
  patientId: string;
}

export default function PatientAppointmentsList({ patientId }: PatientAppointmentsProps) {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['patient-appointments', patientId],
    queryFn: () => fetchPatientAppointments(patientId),
    enabled: Boolean(patientId),
    staleTime: 1000 * 60 * 3, // 3 mins caching
  });

  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Appointments</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Review and manage your scheduled clinical consultations.
        </p>
      </div>

      <AppointmentFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {isLoading ? (
        <AppointmentListSkeleton />
      ) : isError ? (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold">
            {(error as Error)?.message || 'Failed to retrieve appointments.'}
          </p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
          <CalendarX2 className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Appointments Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You don't have any appointments matching the selected status filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}