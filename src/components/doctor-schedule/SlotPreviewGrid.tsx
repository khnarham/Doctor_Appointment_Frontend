'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Layers, Sparkles } from 'lucide-react';

interface SlotPreviewGridProps {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export function SlotPreviewGrid({ startTime, endTime, slotDuration }: SlotPreviewGridProps) {
  const slots = useMemo(() => {
    if (!startTime || !endTime || !slotDuration || slotDuration <= 0) return [];

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return [];

    let currentMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (endMinutes <= currentMinutes) return [];

    const calculatedSlots: { start: string; end: string }[] = [];

    const formatTime = (totalMins: number) => {
      const h = Math.floor(totalMins / 60) % 24;
      const m = totalMins % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    while (currentMinutes + slotDuration <= endMinutes) {
      const slotStart = formatTime(currentMinutes);
      const slotEnd = formatTime(currentMinutes + slotDuration);
      calculatedSlots.push({ start: slotStart, end: slotEnd });
      currentMinutes += slotDuration;
    }

    return calculatedSlots;
  }, [startTime, endTime, slotDuration]);

  if (slots.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
        <Clock className="h-8 w-8 text-slate-300 mb-2 stroke-[1.5]" />
        <p className="text-xs font-semibold text-slate-500">No time slots generated yet</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Provide valid Start Time, End Time (24h format), and Slot Duration above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-teal-600" />
          Generated Slots Preview
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold">
          {slots.length} Total Slots
        </span>
      </div>

      <div className="max-h-56 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <AnimatePresence>
          {slots.map((slot, index) => (
            <motion.div
              key={`${slot.start}-${slot.end}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: index * 0.02 }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-teal-500/10 transition-all text-center flex flex-col justify-center"
            >
              <div className="text-[11px] font-mono font-bold text-slate-800">
                {slot.start} - {slot.end}
              </div>
              <div className="text-[9px] text-slate-400 font-semibold mt-0.5 flex items-center justify-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-teal-500" /> {slotDuration} mins
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}