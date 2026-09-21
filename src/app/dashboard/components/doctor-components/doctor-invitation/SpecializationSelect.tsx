'use client';

import { Stethoscope } from 'lucide-react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { DoctorInvitationFormValues, SpecializationOption } from '@/lib/schema/doctor-invitation';
import { CustomSelect } from '@/components/ui/CustomSelect';

interface SpecializationSelectProps {
  control: Control<DoctorInvitationFormValues>;
  error?: FieldError;
  specializations: SpecializationOption[];
  isLoading: boolean;
}

export function SpecializationSelect({
  control,
  error,
  specializations,
  isLoading,
}: SpecializationSelectProps) {
  return (
    <Controller
      name="specialization_id"
      control={control}
      render={({ field }) => (
        <CustomSelect
          label="Assigned Specialization"
          icon={<Stethoscope className="h-3.5 w-3.5 text-slate-400" />}
          options={specializations}
          value={field.value}
          onChange={field.onChange}
          placeholder="Select a clinical domain..."
          isLoading={isLoading}
          error={error?.message}
          required
        />
      )}
    />
  );
}