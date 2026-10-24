'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  CalendarCheck, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Plus, 
  CalendarDays, 
  Activity 
} from 'lucide-react';

export function SchedulesHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
      
      {/* Background Ambient Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Left Side: Title & Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> Clinical Operations
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <ShieldCheck className="h-3 w-3 text-emerald-600" /> Realtime Slots
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Doctor Work Schedules
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            Manage practice shifts, view live generated time slots, and verify active slot availability across clinical operating days.
          </p>
        </div>

        {/* Right Side: Quick Action & Authenticated Session Pill */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          <Link 
            href="/dashboard/doctor/schedules/create" 
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-600/20"
          >
            <Plus className="h-4 w-4" />
            <span>Create Schedule</span>
          </Link>

          <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Managing Specialist</p>
              <h3 className="text-sm font-black text-slate-900">{user?.name || 'Practitioner'}</h3>
              <p className="text-[11px] font-mono text-slate-500">ID: {user?.user_id || 'N/A'}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Quick Metrics Strip */}
      <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Slot Generation</p>
            <p className="text-xs font-bold text-slate-800">Dynamic Realtime</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Availability</p>
            <p className="text-xs font-bold text-slate-800">Weekly Shift Mapping</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold">Booking Engine</p>
            <p className="text-xs font-bold text-slate-800">Conflict-Free PGX</p>
          </div>
        </div>
      </div>
    </div>
  );
}