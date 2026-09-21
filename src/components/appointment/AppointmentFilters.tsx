import React from 'react';
import { AppointmentStatus } from '@/types/appointment';

interface AppointmentFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const statuses = ['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {statuses.map((status) => {
        const isActive = statusFilter === status;
        return (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              isActive
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
};