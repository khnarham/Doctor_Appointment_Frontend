'use client';

import React, { useState } from 'react';
import { DoctorAppointment, AppointmentStatus } from '@/types/appointment';
import { Calendar, Clock, User, Hash, Edit3 } from 'lucide-react';
import { UpdateStatusModal } from './UpdateStatusModal';

interface DoctorAppointmentCardProps {
  appointment: DoctorAppointment;
  onStatusUpdate: (appointmentId: string, newStatus: AppointmentStatus) => Promise<void>;
}

// Convert numeric minutes (e.g. 580) to "09:40"
const formatMinutesTo24H = (totalMinutes: number | string): string => {
  const mins = typeof totalMinutes === 'string' ? parseInt(totalMinutes, 10) : totalMinutes;
  if (isNaN(mins)) return '00:00';

  const hours = Math.floor(mins / 60) % 24;
  const minutes = mins % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const DoctorAppointmentCard: React.FC<DoctorAppointmentCardProps> = ({
  appointment,
  onStatusUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedStartTime = formatMinutesTo24H(appointment.start_time);
  const formattedEndTime = formatMinutesTo24H(appointment.end_time);

  return (
    <>
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4">
        
        {/* Card Top Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 min-w-0 text-slate-400 font-mono text-xs">
            <Hash className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-semibold tracking-tight text-slate-500">
              {appointment.id.substring(0, 8)}...
            </span>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            {appointment.status}
          </span>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="p-2 bg-teal-100/70 text-teal-700 rounded-xl shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
              <p className="text-xs font-bold text-slate-800 truncate">{appointment.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="p-2 bg-slate-200/70 text-slate-700 rounded-xl shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time (24h)</p>
              <p className="text-xs font-bold text-slate-800 truncate">
                {formattedStartTime} - {formattedEndTime}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Reference & Edit Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 min-w-0">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate font-medium">
              Patient ID: <span className="font-bold text-slate-800">{appointment.patient_id.substring(0, 8)}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="py-1.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Update Status
          </button>
        </div>

      </div>

      <UpdateStatusModal
        isOpen={isModalOpen}
        currentStatus={appointment.status}
        appointmentId={appointment.id}
        onClose={() => setIsModalOpen(false)}
        onUpdate={(newStatus) => onStatusUpdate(appointment.id, newStatus)}
      />
    </>
  );
};