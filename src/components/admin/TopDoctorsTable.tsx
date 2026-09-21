'use client';

import { TopDoctor } from '@/types/admin';
import { Award, Stethoscope } from 'lucide-react';

interface TopDoctorsTableProps {
  doctors: TopDoctor[];
}

export const TopDoctorsTable = ({ doctors }: TopDoctorsTableProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Top Earning Practitioners</h2>
            <p className="text-xs text-slate-500">Revenue split calculated from verified completions</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="py-3 px-3">DOCTOR / LICENSE</th>
              <th className="py-3 px-3">FEE</th>
              <th className="py-3 px-3">COMPLETIONS</th>
              <th className="py-3 px-3 text-right">GROSS EARNED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {doctors && doctors.length > 0 ? (
              doctors.map((doc, idx) => (
                <tr key={doc.doctor_id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                        #{idx + 1}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Dr. ID ({doc.doctor_id.slice(0, 8)})</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Lic: {doc.license_number}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-slate-600">
                    Rs. {doc.consultation_fee.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {doc.completed_appointments} Visits
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold font-mono text-slate-900 text-sm">
                    Rs. {doc.total_earned.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-slate-400 font-medium">
                  No billing history recorded for selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};