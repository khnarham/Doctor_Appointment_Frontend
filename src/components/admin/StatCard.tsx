'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>

        <div className="flex items-center gap-2 mt-1.5">
          {trend && (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                trend.isPositive
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {trend.isPositive ? '↑ ' : '↓ '}{trend.value}
            </span>
          )}
          {subtitle && <span className="text-xs text-slate-500 font-normal">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};