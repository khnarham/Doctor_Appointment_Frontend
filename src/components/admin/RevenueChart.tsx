'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { TopDoctor } from '@/types/admin';

interface RevenueChartProps {
  doctors: TopDoctor[];
}

export const RevenueChart = ({ doctors }: RevenueChartProps) => {
  const chartData = doctors.map((d) => ({
    name: `Lic: ${d.license_number.slice(-4)}`,
    Earned: d.total_earned,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Revenue Yield</h2>
          <p className="text-xs text-slate-500">Earnings comparative distribution</p>
        </div>
      </div>

      <div className="h-[270px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-[11px] text-slate-400 font-medium" />
            <YAxis tickLine={false} axisLine={false} className="text-[11px] text-slate-400 font-medium" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#10B981',
                borderRadius: '12px',
                color: '#0F172A',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            />
            <Bar dataKey="Earned" fill="#10B981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};