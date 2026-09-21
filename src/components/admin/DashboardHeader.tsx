'use client';

import { Calendar, Download, RefreshCw, Layers } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardHeaderProps {
  activePreset: string;
  onPresetChange: (preset: string) => void;
  onRefresh: () => void;
  onExportCSV: () => void;
  isRefreshing: boolean;
}

export const DashboardHeader = ({
  activePreset,
  onPresetChange,
  onRefresh,
  onExportCSV,
  isRefreshing,
}: DashboardHeaderProps) => {
  const presets = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const [timeString, setTimeString] = useState<string>('');
  useEffect(() => {
    setTimeString(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Financial Overview</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Realtime revenue tracking & completed doctor payouts
            </p>
          </div>
        </div>

        {/* Right Actions & Export */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Stats</span>
          </button>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Date Filter Toolbar (Schedule Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-medium text-slate-400 mr-2 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Filter:
          </span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => onPresetChange(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePreset === p.id
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
            Last Synced: <span className="text-slate-600 font-medium">{timeString || '--:--:--'}</span>
        </div>
      </div>
    </div>
  );
};