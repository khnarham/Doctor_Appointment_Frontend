'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Mail, Send, Loader2 } from 'lucide-react';
import {
  doctorInvitationSchema,
  DoctorInvitationFormValues,
  DoctorInvitationResponse,
  SpecializationOption,
} from '@/lib/schema/doctor-invitation';
import { cn } from '@/lib/utils';
import { InvitationAlerts } from './InvitationAlerts';
import { SpecializationSelect } from './SpecializationSelect';
import { ListSpecialization } from '@/app/api/specialization';
import { SendDoctorInvitationApi } from '@/app/api/Doctor-Invitation';



export function InviteDoctorForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const { data: specializations = [], isLoading: isLoadingSpecs } = useQuery({
    queryKey: ['specializations'],
    queryFn: ListSpecialization,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DoctorInvitationFormValues>({
    resolver: zodResolver(doctorInvitationSchema),
    defaultValues: {
      email: '',
      specialization_id: '',
    },
  });

  const mutation = useMutation({
    mutationFn: SendDoctorInvitationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-invitations'] });
      reset();
      if (onSuccess) onSuccess();
    },
  });

  const onSubmit = (data: DoctorInvitationFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 shadow-sm">

      <InvitationAlerts
        isSuccess={mutation.isSuccess}
        isError={mutation.isError}
        errorMessage={mutation.error?.message}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            Doctor Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="dr.name@hospital.com"
              {...register('email')}
              className={cn(
                "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all",
                errors.email
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500"
                  : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-medium text-rose-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Specialization Field (Extracted Component) */}
       <SpecializationSelect
  control={control}
  error={errors.specialization_id}
  specializations={specializations}
  isLoading={isLoadingSpecs}
/>
        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting || isLoadingSpecs}
            className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-60 disabled:hover:bg-teal-600 disabled:active:scale-100 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Invitation...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Invitation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}