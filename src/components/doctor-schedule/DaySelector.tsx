'use client';

import { WEEKDAYS } from '@/lib/schema/doctor-schedule';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

interface DaySelectorProps {
  selectedDay: string;
  onSelectDay: (day: typeof WEEKDAYS[number]) => void;
  error?: string;
}

export function DaySelector({ selectedDay, onSelectDay, error }: DaySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-teal-600" /> Select Day of Week
        </span>
        <span className="text-[11px] text-slate-400 font-normal">Single-day schedule configuration</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <motion.button
              key={day}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectDay(day)}
              className={cn(
                'py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center gap-0.5 cursor-pointer',
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/25 ring-2 ring-teal-600/20'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              )}
            >
              <span>{day.substring(0, 3)}</span>
              <span
                className={cn(
                  'text-[9px] uppercase tracking-wider font-semibold',
                  isSelected ? 'text-teal-100' : 'text-slate-400'
                )}
              >
                {day}
              </span>
            </motion.button>
          );
        })}
      </div>
      {error && <p className="text-[11px] font-semibold text-rose-500 mt-1">{error}</p>}
    </div>
  );
}