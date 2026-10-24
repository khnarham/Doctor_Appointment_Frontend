'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { 
  Mail, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import {
  receptionistInviteSchema,
  ReceptionistInviteFormValues,
  InviteReceptionistRequest,
} from '@/lib/schema/receptionist-invite';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { SendReceptionistInviteApi } from '@/app/api/validation/Receptionist-invite';


export function InviteReceptionistForm() {
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);
   
  console.log("form" , user)
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReceptionistInviteFormValues>({
    resolver: zodResolver(receptionistInviteSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: SendReceptionistInviteApi,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ReceptionistInviteFormValues) => {
    // Check doctor ID dynamically on click
    const doctorId = user?.user_id;

    if (!doctorId) {
      alert('Session error: Doctor ID not found. Please log in again.');
      return;
    }

    const payload: InviteReceptionistRequest = {
      doctor_id: doctorId,
      email: data.email,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-10">
      
      {/* Visual Header Badge */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-[11px] font-bold tracking-wide mb-3">
          <Sparkles className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
          <span>FRONT-DESK ACCESS CONTROL</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Invite Desk Staff</h1>
        <p className="text-xs text-slate-500 mt-1">
          Issue a single-use tokenized onboarding email for your clinical desk.
        </p>
      </div>

      {/* Active Session Info Card (Doctor Context) */}
      <div className="mb-6 p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <UserCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">Issuing Doctor</div>
            <div className="text-xs font-bold text-slate-100 truncate max-w-[180px]">
              {mounted && user?.name ? user.name : 'Doctor Session'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>{mounted && user?.user_id ? 'Active Session' : 'Syncing...'}</span>
        </div>
      </div>

      {/* Success / Error Banners */}
      {mutation.isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Invitation token dispatched successfully to inbox!</span>
        </div>
      )}

      {mutation.isError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in duration-200 shadow-sm">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Email Field with Floating Focus Box */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-teal-600" /> Receptionist Work Email
            </span>
            <span className="text-rose-500 text-[11px]">*Required</span>
          </label>
          
          <div className="relative group">
            <input
              type="email"
              placeholder="e.g. receptionist@clinic.com"
              {...register('email')}
              className={cn(
                "w-full px-4 py-3 text-sm bg-slate-50/70 border rounded-2xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all shadow-inner",
                errors.email 
                  ? "border-rose-300 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500" 
                  : "border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 group-hover:border-slate-300"
              )}
            />
          </div>
          
          {errors.email && (
            <p className="text-[11px] font-semibold text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.email.message}
            </p>
          )}
        </div>

        {/* Action Button - Fully Interactive */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 text-white text-xs font-bold tracking-wide rounded-2xl shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 flex items-center justify-center gap-2 transition-all duration-200"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing Token...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Invitation Token</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}