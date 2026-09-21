'use client';

import { User } from 'lucide-react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { DoctorRegistrationFormValues } from '@/lib/schema/doctor-registration';
import { cn } from '@/lib/utils';

interface GenderSelectProps {
  register: UseFormRegister<DoctorRegistrationFormValues>;
  error?: FieldError;
}

export function GenderSelect({ register, error }: GenderSelectProps) {
  const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
        <User className="h-3.5 w-3.5 text-slate-400" />
        Gender <span className="text-rose-500">*</span>
      </label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex items-center justify-center px-3 py-2.5 border rounded-xl cursor-pointer text-xs font-semibold transition-all select-none",
              "hover:bg-slate-50",
              "has-[:checked]:bg-teal-50 has-[:checked]:border-teal-500 has-[:checked]:text-teal-900 border-[var(--border-light)] text-slate-600"
            )}
          >
            <input
              type="radio"
              value={opt.value}
              {...register('gender')}
              className="sr-only"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-[11px] font-medium text-rose-500 mt-1">{error.message}</p>}
    </div>
  );
}