'use client';

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DoctorAppointment, AppointmentStatus } from '@/types/appointment';
import { Loader2, AlertCircle, CalendarX } from 'lucide-react';
import { DoctorAppointmentHeader } from '../../components/doctor-components/doctor-appointment/DoctorAppointmentHeader';
import { DoctorAppointmentCard } from '../../components/doctor-components/doctor-appointment/DoctorAppointmentCard';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';

// Fetch appointments API
async function fetchDoctorAppointments(doctorId: string): Promise<DoctorAppointment[]> {
  const res = await api.get(`/appointments/doctors/${doctorId}/appointments`);
  return res.data?.data || [];
}

// Interface strictly matching Go struct: UpdateAppointmentStatusRequest
interface UpdateStatusPayload {
  appointmentId: string;
  doctorId: string;
  status: AppointmentStatus;
}

// Update status API
async function updateAppointmentStatus({
  appointmentId,
  doctorId,
  status,
}: UpdateStatusPayload) {
  // URL Param: appointmentId | Request Body: doctor_id, new_status
  const res = await api.patch(`/appointments/${appointmentId}/status`, {
    doctor_id: doctorId,
    new_status: status,
  });
  return res.data;
}

export default function DoctorAppointmentsPage() {
  const queryClient = useQueryClient();
  const { data: doctors } = useDoctorProfile();
  
  const doctorId = doctors?.id;

  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['doctor-appointments', doctorId],
    queryFn: () => fetchDoctorAppointments(doctorId!),
    enabled: !!doctorId,
  });

  const statusMutation = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments', doctorId] });
    },
  });

  const handleStatusUpdate = async (appointmentId: string, newStatus: AppointmentStatus) => {
    if (!doctorId) return;
    
    await statusMutation.mutateAsync({
      appointmentId,
      doctorId,
      status: newStatus,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Custom Header Component */}
        <DoctorAppointmentHeader totalAppointments={appointments.length} />

        {/* Content Section */}
        <main>
          {!doctorId ? (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Doctor session missing.</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              <p className="text-xs font-bold text-slate-500">Loading appointments queue...</p>
            </div>
          ) : isError ? (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700 text-xs font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{(error as Error)?.message || 'Failed to fetch doctor appointments.'}</span>
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
              <CalendarX className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Appointments Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                There are no scheduled patient consultations assigned to your profile at this moment.
              </p>
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
        </main>

      </div>
    </div>
  );
}