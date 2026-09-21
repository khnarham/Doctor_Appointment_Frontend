'use client';

import { useState } from 'react';
import { useDoctorAnalytics } from '@/hooks/useDoctorAnalytics';
import { DashboardHeader } from './DashboardHeader';
import { RecentPatientsTable } from './RecentPatientsTable';
import { AlertCircle, Loader2 } from 'lucide-react';
import { AnalyticsCardsGrid } from './AnalyticsCardsGrid';

interface DoctorDashboardProps {
  doctorId: string;
}

export const DoctorDashboard = ({ doctorId }: DoctorDashboardProps) => {
  const [activePreset, setActivePreset] = useState<string>('all');
  const { data, isLoading, isError, error, refetch, isRefetching } = useDoctorAnalytics(doctorId);

  // Export Patients Data as CSV
  const handleExportCSV = () => {
    if (!data?.recent_patients || data.recent_patients.length === 0) {
      alert('No patient data available to export.');
      return;
    }

    const headers = ['Appointment ID', 'Patient Name', 'Type', 'Phone', 'Date', 'Start Time', 'End Time', 'Status'];
    const rows = data.recent_patients.map((p) => [
      p.appointment_id,
      `"${p.patient_name}"`,
      p.is_walk_in ? 'Walk-In' : 'Registered',
      p.patient_phone || 'N/A',
      p.appointment_date,
      p.start_time,
      p.end_time,
      p.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Doctor_Analytics_${doctorId}_${activePreset}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Loading Practice Analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 max-w-xl mx-auto my-12 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-base">Failed to sync analytics</h4>
            <p className="text-xs text-rose-600 mt-1">
              {error instanceof Error ? error.message : 'An error occurred while fetching dashboard data.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          type="button"
          className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto">
      {/* 1. Header with Filters & Actions */}
      <DashboardHeader
        activePreset={activePreset}
        onPresetChange={(preset) => {
          setActivePreset(preset);
          refetch();
        }}
        onRefresh={refetch}
        onExportCSV={handleExportCSV}
        isRefreshing={isRefetching}
      />

      {/* 2. Prominent Stat Cards */}
      {data?.summary && <AnalyticsCardsGrid summary={data.summary} />}

      {/* 3. Patients Table */}
      <div className="pt-2">
        <RecentPatientsTable patients={data?.recent_patients || []} />
      </div>
    </div>
  );
};

export default DoctorDashboard;