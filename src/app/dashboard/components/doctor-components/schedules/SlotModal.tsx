'use client';

import React from 'react';
import { X, Clock, CheckCircle2, XCircle } from 'lucide-react';

export interface ScheduleSlot {
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface DoctorSchedule {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  slots: ScheduleSlot[];
}

interface SlotModalProps {
  schedule: DoctorSchedule | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SlotModal({ schedule, isOpen, onClose }: SlotModalProps) {
  if (!isOpen || !schedule) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">
              Shift Details & Slots
            </span>
            <h2 className="text-xl font-black text-slate-900">{schedule.day} Schedule</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {schedule.start_time} - {schedule.end_time} ({schedule.slot_duration_minutes} mins duration)
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Slots Grid */}
        <div className="py-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Generated Time Slots ({schedule.slots?.length || 0})</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5"/> Available</span>
              <span className="flex items-center gap-1 text-rose-500"><XCircle className="h-3.5 w-3.5"/> Booked</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {schedule.slots && schedule.slots.length > 0 ? (
              schedule.slots.map((slot, idx) => (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex flex-col gap-1 transition-all ${
                    slot.is_booked 
                      ? 'bg-rose-50/50 border-rose-200/80 text-rose-900' 
                      : 'bg-emerald-50/40 border-emerald-200/80 text-emerald-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Clock className={`h-3.5 w-3.5 ${slot.is_booked ? 'text-rose-500' : 'text-emerald-600'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      slot.is_booked ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {slot.is_booked ? 'Booked' : 'Available'}
                    </span>
                  </div>
                  <p className="text-xs font-black font-mono mt-1">
                    {slot.start_time} - {slot.end_time}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-xs text-slate-400 py-6">No slots generated for this schedule.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Close Modal
          </button>
        </div>

      </div>
    </div>
  );
}