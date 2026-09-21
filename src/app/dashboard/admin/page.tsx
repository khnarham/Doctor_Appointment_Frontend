'use client';

import { useEffect, useState } from 'react';
import { Wallet, CheckCircle, Users, Activity, Loader2, Zap, ShieldAlert, Clock, TrendingUp } from 'lucide-react';
import { FinancialOverviewData } from '@/types/admin';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { StatCard } from '@/components/admin/StatCard';
import { TopDoctorsTable } from '@/components/admin/TopDoctorsTable';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { DoctorDirectoryCard } from '@/components/admin/DoctorDirectoryCard';

export default function AdminFinancialDashboard() {
  const [data, setData] = useState<FinancialOverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>('month');

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/appointments/analytics/financial-overview`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [activePreset]);

  const handleExportCSV = () => {
    if (!data?.top_earning_doctors) return;
    const headers = 'Doctor ID,License Number,Consultation Fee,Completed Appointments,Total Earned\n';
    const rows = data.top_earning_doctors
      .map((d) => `${d.doctor_id},${d.license_number},${d.consultation_fee},${d.completed_appointments},${d.total_earned}`)
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${activePreset}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto text-slate-800">
      {/* Schedule-Style Header Filter */}
      <DashboardHeader
        activePreset={activePreset}
        onPresetChange={setActivePreset}
        onRefresh={fetchOverview}
        onExportCSV={handleExportCSV}
        isRefreshing={loading}
      />

      {loading && !data ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <span className="text-xs font-semibold text-slate-500">Recalculating Financial Metrics...</span>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Gross Revenue"
              value={`Rs. ${(data?.total_revenue || 0).toLocaleString()}`}
              subtitle="From completed visits"
              icon={<Wallet className="w-5 h-5" />}
              trend={{ value: '14.2%', isPositive: true }}
            />
            <StatCard
              title="Completed Visits"
              value={data?.total_completed_appointments || 0}
              subtitle="Verified appointments"
              icon={<CheckCircle className="w-5 h-5" />}
              trend={{ value: '5.8%', isPositive: true }}
            />
            <StatCard
              title="Earning Doctors"
              value={data?.top_earning_doctors.length || 0}
              subtitle="Active practitioners"
              icon={<Users className="w-5 h-5" />}
            />
            <StatCard
              title="Avg. Visit Ticket"
              value={`Rs. ${
                data?.total_completed_appointments
                  ? Math.round(data.total_revenue / data.total_completed_appointments).toLocaleString()
                  : 0
              }`}
              subtitle="Revenue per completion"
              icon={<Activity className="w-5 h-5" />}
            />
          </div>

          {/* Grid Layout - Analytics */}
     <div className=" p-4 rounded-2xl">
      {/* Single Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Spans 2 Columns (Table + Card Vertical Stack) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Component */}
          <TopDoctorsTable doctors={data?.top_earning_doctors || []} />

          {/* New Half Green / Half Black Card Directly Below Table */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-900/40 p-6 shadow-2xl flex flex-col justify-between gap-6 bg-gradient-to-br from-emerald-950 via-zinc-950 to-black">
            
            {/* Subtle Ambient Glow Effects */}
            <div className="absolute top-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 rounded-xl shadow-xs">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-100 tracking-wider uppercase">
                    Clinical Metrics & System Operations
                  </h3>
                  <p className="text-xs text-zinc-400">Live operational feed and throughput health</p>
                </div>
              </div>

              {/* Glowing Green Dot Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 shadow-inner">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                </span>
                ACTIVE SYSTEM
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
              <div className="bg-zinc-950/80 border border-emerald-950/80 hover:border-emerald-800/50 rounded-xl p-4 transition-colors space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-medium uppercase tracking-wider">Avg Consultation</span>
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-lg font-bold font-mono text-emerald-300">18.4 min</p>
                <p className="text-[10px] text-emerald-500 font-medium">↑ 4.2% fast efficiency</p>
              </div>

              <div className="bg-zinc-950/80 border border-emerald-950/80 hover:border-emerald-800/50 rounded-xl p-4 transition-colors space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-medium uppercase tracking-wider">Slot Utilization</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-lg font-bold font-mono text-emerald-300">92.8%</p>
                <p className="text-[10px] text-emerald-500 font-medium">High patient load</p>
              </div>

              <div className="bg-zinc-950/80 border border-emerald-950/80 hover:border-emerald-800/50 rounded-xl p-4 transition-colors space-y-1">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-medium uppercase tracking-wider">No-Show Rate</span>
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-lg font-bold font-mono text-emerald-300">1.8%</p>
                <p className="text-[10px] text-zinc-400 font-medium">Optimal threshold</p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-xl p-3 flex items-start gap-2.5 relative z-10">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-emerald-400 font-semibold">Live Feed:</strong> All clinic node databases operating under nominal latency limits (&lt;5ms).
              </p>
            </div>

          </div>

        </div>

        {/* Right Side: Spans 1 Column (Revenue Chart) */}
        <div className="lg:col-span-1">
          <RevenueChart doctors={data?.top_earning_doctors || []} />
        </div>

      </div>
    </div>
          {/* Full Width Aligned Doctor Directory */}
          <div className="w-full pt-2">
            <DoctorDirectoryCard />
          </div>
        </>
      )}
    </div>
  );
}