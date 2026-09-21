'use client';

import { DoctorAnalyticsSummary } from '@/types/doctor_analytics';
import { 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Users 
} from 'lucide-react';
import { StatCard } from './StatsCard';

interface Props {
  summary: DoctorAnalyticsSummary;
}

export const AnalyticsCardsGrid = ({ summary }: Props) => {
  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <StatCard
        title="Total Revenue"
        value={formatPKR(summary.total_earnings)}
        subtitle="Gross completed consultations"
        icon={<DollarSign className="w-6 h-6" />}
        iconBgColor="bg-emerald-50 border-emerald-100"
        iconTextColor="text-emerald-600"
      />

      <StatCard
        title="Total Appointments"
        value={summary.total_appointments}
        subtitle="All scheduled & walk-in slots"
        icon={<Calendar className="w-6 h-6" />}
        iconBgColor="bg-blue-50 border-blue-100"
        iconTextColor="text-blue-600"
      />

      <StatCard
        title="Completed Patients"
        value={summary.completed_appointments}
        subtitle="Successfully attended"
        icon={<CheckCircle2 className="w-6 h-6" />}
        iconBgColor="bg-green-50 border-green-100"
        iconTextColor="text-green-600"
      />

      <StatCard
        title="Pending Slots"
        value={summary.pending_appointments}
        subtitle="Upcoming or in-queue"
        icon={<Clock className="w-6 h-6" />}
        iconBgColor="bg-amber-50 border-amber-100"
        iconTextColor="text-amber-600"
      />

      <StatCard
        title="Cancelled Visits"
        value={summary.cancelled_appointments}
        subtitle="No-show or manually cancelled"
        icon={<XCircle className="w-6 h-6" />}
        iconBgColor="bg-rose-50 border-rose-100"
        iconTextColor="text-rose-600"
      />

      <StatCard
        title="Unique Patients"
        value={summary.unique_patients_count}
        subtitle="Distinct patient profiles served"
        icon={<Users className="w-6 h-6" />}
        iconBgColor="bg-purple-50 border-purple-100"
        iconTextColor="text-purple-600"
      />
    </div>
  );
};