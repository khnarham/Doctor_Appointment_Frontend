'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stethoscope, FileText, PlusCircle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { specializationSchema, SpecializationFormValues } from '@/lib/schema/specialization';
import { cn } from '@/lib/utils';
import { createSpecialization } from '@/app/api/specialization';


export function CreateSpecializationForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SpecializationFormValues>({
    resolver: zodResolver(specializationSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const descriptionText = watch('description', '');

  const mutation = useMutation({
    mutationFn: createSpecialization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specializations'] });
    },
  });

  const onSubmit = (data: SpecializationFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
        <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Create Medical Specialization</h2>
          <p className="text-xs text-slate-500 mt-0.5">Add clinical domains for doctor department classification</p>
        </div>
      </div>

      {/* Success / Error Alerts */}
      {mutation.isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Specialization successfully added to system core!</span>
        </div>
      )}
      {/* Success / Error Alerts */}

      {mutation.isError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in duration-200">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span>{mutation.error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            Specialization Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Cardiology, Neurology, Orthopedics"
              {...register('name')}
              className={cn(
                "w-full px-4 py-2.5 text-sm bg-slate-50/50 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all",
                errors.name 
                  ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" 
                  : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
              )}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              Description <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] text-slate-400 font-medium">
              {descriptionText.length}/300
            </span>
          </div>
          <textarea
            rows={4}
            placeholder="Brief overview of clinical conditions treated under this specialization..."
            {...register('description')}
            className={cn(
              "w-full p-4 text-sm bg-slate-50/50 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none",
              errors.description 
                ? "border-rose-300 focus:ring-rose-500/20 focus:border-rose-500" 
                : "border-[var(--border-light)] focus:ring-teal-500/20 focus:border-teal-500"
            )}
          />
          {errors.description && (
            <p className="text-[11px] font-medium text-rose-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending || isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-60 disabled:hover:bg-teal-600 disabled:active:scale-100 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Specialization...</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Create Specialization</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}