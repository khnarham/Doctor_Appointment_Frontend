'use client';

import React from 'react';
import { Calendar, Clock, ChevronRight, Layers } from 'lucide-react';
import { DoctorSchedule } from './SlotModal';

interface ScheduleCardProps {
  schedule: DoctorSchedule;
  onClick: () => void;
}

export function ScheduleCard({ schedule, onClick }: ScheduleCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white border border-slate-200/80 hover:border-indigo-500 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 group-hover:bg-indigo-50 text-slate-700 group-hover:text-indigo-700 transition-colors">
          <Calendar className="h-4 w-4" />
          <span className="text-xs font-black uppercase tracking-wider">{schedule.day}</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-slate-900">
          <Clock className="h-4 w-4 text-indigo-600" />
          <span className="text-base font-black font-mono">{schedule.start_time} - {schedule.end_time}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            {schedule.slots?.length || 0} Dynamic Slots
          </span>
          <span>•</span>
          <span>{schedule.slot_duration_minutes} Mins Duration</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-indigo-600 flex items-center justify-between">
        <span>Click to view slots availability</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Open Popup →</span>
      </div>
    </div>
  );
}