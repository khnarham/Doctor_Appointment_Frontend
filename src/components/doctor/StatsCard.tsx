'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBgColor?: string;
  iconTextColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = 'bg-emerald-50 border-emerald-100',
  iconTextColor = 'text-emerald-600',
  trend,
}: StatCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-3 rounded-xl border ${iconBgColor} ${iconTextColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>

        {(trend || subtitle) && (
          <div className="flex items-center gap-2 mt-2">
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
            {subtitle && <span className="text-xs text-slate-500 font-medium">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};