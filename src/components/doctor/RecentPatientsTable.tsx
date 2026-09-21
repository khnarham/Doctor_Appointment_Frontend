import React from 'react';
import { UserCheck, User } from 'lucide-react';
import { DoctorPatientDetail } from '@/types/doctor_analytics';

interface Props {
  patients: DoctorPatientDetail[];
}

export const RecentPatientsTable: React.FC<Props> = ({ patients }) => {
  // Convert Integer minutes/seconds to HH:MM AM/PM format
  const formatTime = (timeInMinutes: number) => {
    const hours = Math.floor(timeInMinutes / 60);
    const mins = timeInMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    return `${formattedHours}:${formattedMins} ${period}`;
  };

  const getStatusBadge = (status: DoctorPatientDetail['status']) => {
    const styles = {
      COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
      CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
    };

    return (
      <span
        className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  if (!patients.length) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
        No recent patients found for this doctor.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Recent Appointments</h3>
        <span className="text-xs text-slate-500">Showing last appointments</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/75 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">Patient</th>
              <th className="px-6 py-3 font-semibold">Type</th>
              <th className="px-6 py-3 font-semibold">Phone</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Time Slot</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {patients.map((item) => (
              <tr key={item.appointment_id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {item.patient_name}
                </td>
                <td className="px-6 py-4">
                  {item.is_walk_in ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700 font-medium">
                      <User className="w-3 h-3" /> Walk-In
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 font-medium">
                      <UserCheck className="w-3 h-3" /> Registered
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{item.patient_phone || 'N/A'}</td>
                <td className="px-6 py-4">
                  {new Date(item.appointment_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-700">
                  {formatTime(item.start_time)} - {formatTime(item.end_time)}
                </td>
                <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};