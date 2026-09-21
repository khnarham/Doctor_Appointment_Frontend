'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight 
} from 'lucide-react';
import { 
  receptionistRegisterSchema, 
  ReceptionistRegisterFormValues, 
  AcceptInvitationRequest 
} from '@/lib/schema/receptionist-register';
import { cn } from '@/lib/utils';
import { AcceptReceptionistInviteApi } from '@/app/api/validation/Accept-Receptionist-Invite';



export function RegisterReceptionistForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract token from URL search query: ?token=XYZ
  const tokenFromUrl = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReceptionistRegisterFormValues>({
    resolver: zodResolver(receptionistRegisterSchema),
    defaultValues: {
      token: tokenFromUrl,
      full_name: '',
      password: '',
      confirm_password: '',
    },
  });

  // Sync token value if URL param resolves after render
  useEffect(() => {
    if (tokenFromUrl) {
      setValue('token', tokenFromUrl);
    }
  }, [tokenFromUrl, setValue]);

  const mutation = useMutation({
    mutationFn: AcceptReceptionistInviteApi,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/login?registered=true');
      }, 2000);
    },
  });

  const onSubmit = (data: ReceptionistRegisterFormValues) => {
    // Map strictly to Go Backend Struct
    const payload: AcceptInvitationRequest = {
      token: data.token,
      full_name: data.full_name,
      password: data.password,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 sm:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Your Account</h1>
        <p className="text-xs text-slate-500 mt-1">
          Enter your full legal name and password to activate your receptionist account.
        </p>
      </div>

      {/* Invalid or Missing Token Alert */}
      {!tokenFromUrl && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-semibold">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <span>Warning: No invitation token detected in the URL link.</span>
        </div>
      )}

      {/* Success / Error Banners */}
      {mutation.isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Registration complete! Redirecting to login...</span>
        </div>
      )}

      {mutation.isError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Token Input (Read-only display for security transparency) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5 text-slate-400" /> Invitation Token
          </label>
          <input
            type="text"
            readOnly
            {...register('token')}
            placeholder="Token missing"
            className="w-full px-4 py-2.5 text-xs font-mono bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed focus:outline-none"
          />
          {errors.token && <p className="text-[11px] font-semibold text-rose-500">{errors.token.message}</p>}
        </div>

        {/* Full Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" /> Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Sara Ahmed"
            {...register('full_name')}
            className={cn(
              "w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:bg-white transition-all",
              errors.full_name ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.full_name && <p className="text-[11px] font-semibold text-rose-500">{errors.full_name.message}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" /> Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              {...register('password')}
              className={cn(
                "w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 pr-10 focus:outline-none focus:bg-white transition-all",
                errors.password ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[11px] font-semibold text-rose-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" /> Confirm Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              {...register('confirm_password')}
              className={cn(
                "w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 pr-10 focus:outline-none focus:bg-white transition-all",
                errors.confirm_password ? "border-rose-300 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" : "border-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirm_password && <p className="text-[11px] font-semibold text-rose-500">{errors.confirm_password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={mutation.isPending || !tokenFromUrl}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Activating Account...</span>
              </>
            ) : (
              <>
                <span>Complete Account Registration</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}