'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { User, Lock, FileBadge, DollarSign, Loader2, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import {
  doctorRegistrationSchema,
  DoctorRegistrationFormValues,
} from '@/lib/schema/doctor-registration';
import { cn } from '@/lib/utils';
import { GenderSelect } from './GenderSelect';
import { RegisterDoctorApi } from '@/app/api/Doctor-accesting';



export function DoctorRegistrationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DoctorRegistrationFormValues>({
    resolver: zodResolver(doctorRegistrationSchema),
    defaultValues: {
      token: tokenFromUrl,
      name: '',
      password: '',
      gender: undefined,
      license_number: '',
      consultation_fee: 0,
    },
  });

  useEffect(() => {
    if (tokenFromUrl) {
      setValue('token', tokenFromUrl);
    }
  }, [tokenFromUrl, setValue]);

  const mutation = useMutation({
    mutationFn: RegisterDoctorApi,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 1500);
    },
  });

  const onSubmit = (data: DoctorRegistrationFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Complete Registration</h1>
        <p className="text-xs text-slate-500 mt-1">
          Provide your professional credentials to activate your doctor account
        </p>
      </div>

      {/* Invalid Token Banner */}
      {!tokenFromUrl && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800 text-xs font-semibold">
          <KeyRound className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div>Missing Registration Token</div>
            <p className="font-normal text-[11px] text-amber-700 mt-0.5">
              Please use the official invite link sent to your clinical email address.
            </p>
          </div>
        </div>
      )}

      {/* Success / Error Banners */}
      {mutation.isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Account verified & created! Redirecting to login...</span>
        </div>
      )}

      {mutation.isError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in duration-200">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" /> Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Dr. Alexander Fleming"
            {...register('name')}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all",
              errors.name ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.name && <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" /> Password <span className="text-rose-500">*</span>
          </label>
          <input
            type="password"
            placeholder="••••••••••••"
            {...register('password')}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all",
              errors.password ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.password && <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.password.message}</p>}
        </div>

        {/* Gender Selection */}
        <GenderSelect register={register} error={errors.gender} />

        {/* Medical License Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FileBadge className="h-3.5 w-3.5 text-slate-400" /> Medical License Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. PMC-98421-D"
            {...register('license_number')}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all",
              errors.license_number ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.license_number && <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.license_number.message}</p>}
        </div>

        {/* Consultation Fee */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-slate-400" /> Consultation Fee <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            step="1"
            placeholder="2500"
            {...register('consultation_fee', { valueAsNumber: true })}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all",
              errors.consultation_fee ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.consultation_fee && <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.consultation_fee.message}</p>}
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting || !tokenFromUrl}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-60 disabled:active:scale-100 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2 transition-all"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registering Credentials...</span>
              </>
            ) : (
              <span>Complete Doctor Registration</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}