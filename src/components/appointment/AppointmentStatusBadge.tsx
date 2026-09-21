import React from 'react';
import { AppointmentStatus } from '@/types/appointment';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

export const AppointmentStatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    PENDING: {
      label: 'Pending',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      icon: Clock,
    },
    CONFIRMED: {
      label: 'Confirmed',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      icon: CheckCircle2,
    },
    CANCELLED: {
      label: 'Cancelled',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      borderColor: 'border-rose-200',
      icon: XCircle,
    },
    COMPLETED: {
      label: 'Completed',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200',
      icon: AlertCircle,
    },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${config.bgColor} ${config.textColor} ${config.borderColor}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};