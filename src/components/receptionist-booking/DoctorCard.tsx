'use client';

import React, { useState } from 'react';
import { Doctor } from '@/types/booking';
import { Calendar, Clock, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectSlot: (doctor: Doctor, date: string) => void;
}

export function DoctorCard({ doctor, onSelectSlot }: DoctorCardProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const isAvailable = doctor.status === 'ACTIVE' && doctor.isAvailable;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        {/* Header Status Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isAvailable ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <AlertCircle className="h-3 w-3" />
            )}
            {doctor.status === 'ACTIVE' ? (doctor.isAvailable ? 'Available Today' : 'Busy') : doctor.status}
          </span>
          <div className="flex items-center gap-0.5 text-slate-900 font-black text-sm">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            <span>{doctor.consultationFee}</span>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center font-black text-teal-700 text-lg shrink-0">
            {doctor.fullName ? doctor.fullName.charAt(0) : 'D'}
          </div>
          <div className="truncate">
            <h3 className="text-base font-black text-slate-900 truncate">
              {doctor.fullName || `Dr. License #${doctor.licenseNumber}`}
            </h3>
            <p className="text-xs font-bold text-slate-500 truncate">
              {doctor.specializationName || 'General Practitioner'}
            </p>
          </div>
        </div>
      </div>

      {/* Date Picker & Slot Trigger */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="h-3 w-3 text-teal-600" /> Target Consultation Date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
          />
        </div>

        <button
          disabled={!isAvailable}
          onClick={() => onSelectSlot(doctor, selectedDate)}
          className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>View Available Slots</span>
        </button>
      </div>
    </div>
  );
}