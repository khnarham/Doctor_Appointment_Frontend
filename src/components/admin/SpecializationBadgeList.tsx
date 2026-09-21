'use client';

import { Stethoscope, Check } from 'lucide-react';

interface Specialization {
  id: string;
  name: string;
}

interface SpecializationBadgeListProps {
  specializations: Specialization[];
  selectedSpecialization: string;
  onSelectSpecialization: (id: string) => void;
}

export const SpecializationBadgeList = ({
  specializations,
  selectedSpecialization,
  onSelectSpecialization,
}: SpecializationBadgeListProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <Stethoscope className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Medical Specializations</h3>
          <p className="text-[11px] text-slate-500">Filter directory by clinic department</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectSpecialization('')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedSpecialization === ''
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
          }`}
        >
          {selectedSpecialization === '' && <Check className="w-3.5 h-3.5" />}
          All Departments
        </button>

        {specializations.map((spec) => {
          const isSelected = selectedSpecialization === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => onSelectSpecialization(spec.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5" />}
              {spec.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};