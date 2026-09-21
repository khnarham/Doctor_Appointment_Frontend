'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { CalendarCheck, Sparkles, ShieldCheck, UserCheck, Stethoscope } from 'lucide-react';

interface BookingDeskHeaderProps {
  totalDoctorsCount?: number;
}

export function BookingDeskHeader({ totalDoctorsCount = 0 }: BookingDeskHeaderProps) {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 overflow-hidden">
      {/* Subtle Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
      
      {/* Background Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Side Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" /> Reception Desk Portal
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <ShieldCheck className="h-3 w-3 text-emerald-600" /> Direct Booking Engine
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Walk-In & Patient Appointment Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Filter available practitioners, inspect real-time schedule slots, enter Patient ID, and issue instant appointments.
          </p>
        </div>

        {/* Right Side - Active Staff Session */}
        <div className="shrink-0 flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="h-11 w-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 shrink-0">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Authenticated Staff</p>
            <h3 className="text-sm font-black text-slate-900">{user?.name || 'Reception Staff'}</h3>
            <p className="text-[11px] font-mono text-slate-500">ID: {user?.user_id || 'N/A'}</p>
          </div>
        </div>

      </div>

      {/* Quick Metrics Strip */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Active Doctors</p>
            <p className="text-xs font-bold text-slate-800">{totalDoctorsCount} Practitioners</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CalendarCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Booking Standard</p>
            <p className="text-xs font-bold text-slate-800">Atomic Real-Time</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Concurrency</p>
            <p className="text-xs font-bold text-slate-800">Double-Booking Safe</p>
          </div>
        </div>
      </div>
    </div>
  );
}