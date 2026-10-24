'use client';

import React, { useState } from 'react';
import { DoctorAppointmentCard } from './DoctorAppointmentCard';
import { DoctorAppointment, AppointmentStatus } from '@/types/appointment';
import { Stethoscope, Loader2 } from 'lucide-react';
import { DoctorAppointmentHeader } from './DoctorAppointmentHeader';

interface DoctorDashboardProps {
  initialAppointments?: DoctorAppointment[];
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  initialAppointments = [],
}) => {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(initialAppointments);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (appointmentId: string, newStatus: AppointmentStatus) => {
    // API call trigger logic here
    setAppointments((prev) =>
      prev.map((app) => (app.id === appointmentId ? { ...app, status: newStatus } : app))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Integration */}
   <DoctorAppointmentHeader/>
      {/* Appointments List Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-black text-slate-900">Patient Consultation Queue</h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
            Total: {appointments.length}
          </span>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            <p className="text-xs font-bold text-slate-500">Fetching clinical schedule...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-2">
            <p className="text-sm font-bold text-slate-700">No Appointments Found</p>
            <p className="text-xs text-slate-400">There are no patient bookings matching your active shifts.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {appointments.map((app) => (
              <DoctorAppointmentCard
                key={app.id}
                appointment={app}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};