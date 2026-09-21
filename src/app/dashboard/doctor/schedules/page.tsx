'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDoctorProfile } from '@/hooks/useDoctorProfile'; 
import { Loader2, AlertCircle, CalendarX } from 'lucide-react';
import { DoctorSchedule, SlotModal } from '../../components/doctor-components/schedules/SlotModal';
import { SchedulesHeader } from '../../components/doctor-components/schedules/SchedulesHeader';
import { ScheduleCard } from '../../components/doctor-components/schedules/ScheduleCard';
import { api } from '@/lib/axios';

async function fetchDoctorSchedules(doctorId: string): Promise<DoctorSchedule[]> {
  const res = await api.get(`/schedules/doctor/${doctorId}`);
  if (!res.data?.success) {
    throw new Error(res.data?.message || 'Failed to fetch doctor schedules');
  }
  return res.data.data.schedules || [];
}

export default function DoctorSchedulesPage() {
  const [selectedSchedule, setSelectedSchedule] = useState<DoctorSchedule | null>(null);

  const { isError: isProfileError, error: profileError, data } = useDoctorProfile();

  const {
    data: schedules = [],
    isLoading: isLoadingSchedules,
    isError: isScheduleError,
    error: scheduleError,
  } = useQuery({
    queryKey: ['doctor-schedules', data?.id],
    queryFn: () => fetchDoctorSchedules(data!.id),
    enabled: !!data?.id, 
    staleTime: 1000 * 60 * 5,
  });

  if (isProfileError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700 m-6">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-xs font-semibold">
          Error fetching doctor profile: {(profileError as Error)?.message || 'Unauthorized access or profile issue.'}
        </p>
      </div>
    );
  }

  if (!data?.id && !isProfileError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        <p className="text-xs font-bold text-slate-500">Fetching Practitioner Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Section */}
      <SchedulesHeader />

      {/* Schedules Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Weekly Schedules</h2>
          <span className="text-xs font-bold text-slate-500">
            Total Shifts: {schedules.length}
          </span>
        </div>

        {/* Schedules Loading State */}
        {isLoadingSchedules ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 bg-slate-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : isScheduleError ? (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold">
              {(scheduleError as Error)?.message || 'Failed to load schedule data.'}
            </p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
            <CalendarX className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No Schedules Configured</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              This practitioner currently has no active clinical schedules or shift mappings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id} 
                schedule={schedule} 
                onClick={() => setSelectedSchedule(schedule)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Slot Modal Dialog */}
      <SlotModal 
        schedule={selectedSchedule} 
        isOpen={!!selectedSchedule} 
        onClose={() => setSelectedSchedule(null)} 
      />
    </div>
  );
}