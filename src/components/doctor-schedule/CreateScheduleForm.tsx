'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Clock,
  Timer,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  createScheduleSchema,
  CreateScheduleFormValues,
  CreateScheduleRequest,
} from '@/lib/schema/doctor-schedule';
import { DaySelector } from './DaySelector';
import { SlotPreviewGrid } from './SlotPreviewGrid';
import { cn } from '@/lib/utils';
import { CreateDoctorScheduleApi } from '@/app/api/validation/Create-schedules';
import { useDoctorProfile } from '@/hooks/useDoctorProfile';


export function CreateScheduleForm() {
  const [successMsg, setSuccessMsg] = useState(false);
   const { data: doctor, isLoading } = useDoctorProfile();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateScheduleFormValues>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      day: 'Monday',
      start_time: '09:00',
      end_time: '17:00',
      slot_duration: 30,
    },
  });



  const watchStartTime = watch('start_time');
  const watchEndTime = watch('end_time');
  const watchSlotDuration = watch('slot_duration');

  const mutation = useMutation({
    mutationFn: CreateDoctorScheduleApi,
    onSuccess: () => {
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        reset();
      }, 3000);
    },
  });

  const onSubmit = (data: CreateScheduleFormValues) => {
    if (!doctor?.id) {
      alert('Doctor session ID missing! Please log in again.');
      return;
    }

    const payload: CreateScheduleRequest = {
      doctor_id: doctor.id,
      day: data.day,
      start_time: data.start_time,
      end_time: data.end_time,
      slot_duration: Number(data.slot_duration),
    };

    mutation.mutate(payload);
  };
  
  if (isLoading) return <div>Loading Doctor Info...</div>;
  
  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 space-y-6"
    >
      <div>
        <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-4 w-4" /> Shift Configuration
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Configure Working Hours
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select working day and times. Slot intervals will be generated automatically.
        </p>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Doctor shift schedule created and published!</span>
        </div>
      )}

      {mutation.isError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-semibold">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Day Selector */}
        <Controller
          name="day"
          control={control}
          render={({ field }) => (
            <DaySelector
              selectedDay={field.value}
              onSelectDay={field.onChange}
              error={errors.day?.message}
            />
          )}
        />

        {/* Time Inputs (24-Hour Format) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Start Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-teal-600" /> Start Time (24h) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="09:00"
              maxLength={5}
              {...register('start_time')}
              className={cn(
                "w-full px-4 py-2.5 text-sm font-mono bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:bg-white transition-all text-center",
                errors.start_time ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20" : "border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
            <p className="text-[10px] text-slate-400">Format: 00:00 - 23:59</p>
            {errors.start_time && <p className="text-[11px] font-semibold text-rose-500">{errors.start_time.message}</p>}
          </div>

          {/* End Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-teal-600" /> End Time (24h) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="17:00"
              maxLength={5}
              {...register('end_time')}
              className={cn(
                "w-full px-4 py-2.5 text-sm font-mono bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:bg-white transition-all text-center",
                errors.end_time ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20" : "border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
            <p className="text-[10px] text-slate-400">Format: 00:00 - 24:00</p>
            {errors.end_time && <p className="text-[11px] font-semibold text-rose-500">{errors.end_time.message}</p>}
          </div>

          {/* Slot Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 text-teal-600" /> Duration (Mins) <span className="text-rose-500">*</span>
            </label>
            <select
              {...register('slot_duration')}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              <option value={15}>15 Minutes</option>
              <option value={20}>20 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes</option>
            </select>
            <p className="text-[10px] text-slate-400">Per patient consultation</p>
            {errors.slot_duration && <p className="text-[11px] font-semibold text-rose-500">{errors.slot_duration.message}</p>}
          </div>

        </div>

        {/* Live Slot Preview */}
        <SlotPreviewGrid
          startTime={watchStartTime}
          endTime={watchEndTime}
          slotDuration={Number(watchSlotDuration)}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Publishing Shift...</span>
              </>
            ) : (
              <>
                <span>Save & Publish Shift</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </div>

      </form>
    </motion.div>
  );
}