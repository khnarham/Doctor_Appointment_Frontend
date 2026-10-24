"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Activity,
  Search,
  Bell,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Plus,
  TrendingUp,
  UserCheck,
  Stethoscope,
  Menu,
  X,
  ChevronRight,
  Filter,
} from "lucide-react";

// Mock Data
const stats = [
  { title: "Total Appointments", value: "1,248", change: "+12.5%", isUp: true, icon: Calendar, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { title: "Patients Today", value: "42", change: "+8.2%", isUp: true, icon: Users, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  { title: "Completed Visits", value: "28", change: "+4.1%", isUp: true, icon: UserCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { title: "Canceled Slots", value: "3", change: "-2.3%", isUp: false, icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
];

const upcomingAppointments = [
  { id: "APP-8091", patient: "Hamza Malik", doctor: "Dr. Ayesha Khan", dept: "Cardiology", time: "10:30 AM", date: "Today", status: "Confirmed", avatar: "HM" },
  { id: "APP-8092", patient: "Usman Raza", doctor: "Dr. Bilal Ahmed", dept: "Neurology", time: "11:15 AM", date: "Today", status: "Pending", avatar: "UR" },
  { id: "APP-8093", patient: "Sana Tariq", doctor: "Dr. Ayesha Khan", dept: "Cardiology", time: "12:00 PM", date: "Today", status: "Confirmed", avatar: "ST" },
  { id: "APP-8094", patient: "Zainab Fatima", doctor: "Dr. Tariq Mahmood", dept: "Orthopedics", time: "02:30 PM", date: "Today", status: "In-Progress", avatar: "ZF" },
  { id: "APP-8095", patient: "Ali Hassan", doctor: "Dr. Sarah Ali", dept: "Dermatology", time: "03:45 PM", date: "Tomorrow", status: "Confirmed", avatar: "AH" },
];

const activeDoctors = [
  { name: "Dr. Ayesha Khan", dept: "Cardiology", status: "In Clinic", patientsToday: 14, rating: "4.9" },
  { name: "Dr. Bilal Ahmed", dept: "Neurology", status: "In Consultation", patientsToday: 9, rating: "4.8" },
  { name: "Dr. Tariq Mahmood", dept: "Orthopedics", status: "On Break", patientsToday: 11, rating: "4.7" },
  { name: "Dr. Sarah Ali", dept: "Dermatology", status: "In Clinic", patientsToday: 8, rating: "4.9" },
];

export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex overflow-hidden">
      
      {/* MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral-900/90 border-r border-white/10 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div>
          {/* Brand */}
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-extrabold text-lg tracking-wide text-white">MediPulse</h1>
                <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Health Systems</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {[
              { name: "Dashboard", icon: Activity },
              { name: "Appointments", icon: Calendar },
              { name: "Patients", icon: Users },
              { name: "Doctors", icon: Stethoscope },
              { name: "Schedules", icon: Clock },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-violet-400" : "text-neutral-400"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/60 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center font-bold text-xs text-violet-300">
              AK
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Dr. Arham Khan</p>
              <p className="text-[10px] text-neutral-400 truncate">Head of Clinical Ops</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* HEADER BAR */}
        <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl bg-neutral-900 border border-white/10 lg:hidden text-neutral-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Bar */}
            <div className="relative hidden sm:block w-72 lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search patient, doctor, or ID..."
                className="w-full bg-neutral-900/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]" />
            </button>

            <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:opacity-90 active:scale-95 transition-all">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Book Slot</span>
            </button>
          </div>
        </header>

        {/* DASHBOARD CONTENT BODY */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-violet-600/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-2xl font-black text-white tracking-tight">Clinical Overview</h1>
              <p className="text-sm text-neutral-400 mt-1">Real-time booking metrics and schedule operations for today.</p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950/60 border border-white/10 px-4 py-2 rounded-xl self-start sm:self-auto text-xs text-neutral-300">
              <Clock className="w-4 h-4 text-violet-400" />
              <span>Shift: 08:00 AM - 05:00 PM</span>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl bg-neutral-900/60 border ${stat.border} backdrop-blur-xl relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">{stat.title}</span>
                    <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                    <span className={`text-xs font-bold flex items-center gap-1 ${stat.isUp ? "text-emerald-400" : "text-rose-400"}`}>
                      {stat.change}
                      <TrendingUp className={`w-3 h-3 ${!stat.isUp && "rotate-180"}`} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TWO COLUMN CONTENT: APPOINTMENTS & DOCTORS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: Appointments Table (8 cols) */}
            <div className="lg:col-span-8 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white">Upcoming Appointments</h2>
                    <p className="text-xs text-neutral-400">Live booking queue details</p>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-950/60 border border-white/10 px-3 py-1.5 rounded-lg transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                        <th className="pb-3 px-2">Patient</th>
                        <th className="pb-3 px-2">Doctor</th>
                        <th className="pb-3 px-2">Time</th>
                        <th className="pb-3 px-2">Status</th>
                        <th className="pb-3 px-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {upcomingAppointments.map((row) => (
                        <tr key={row.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-xs text-violet-400">
                                {row.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-white group-hover:text-violet-300 transition-colors">{row.patient}</p>
                                <p className="text-[10px] text-neutral-500 font-mono">{row.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-2">
                            <p className="text-neutral-300 text-xs font-medium">{row.doctor}</p>
                            <p className="text-[10px] text-neutral-500">{row.dept}</p>
                          </td>
                          <td className="py-3.5 px-2">
                            <p className="text-xs font-mono text-neutral-300">{row.time}</p>
                            <p className="text-[10px] text-neutral-500">{row.date}</p>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                              row.status === "Confirmed" 
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : row.status === "Pending"
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                : "bg-violet-500/10 border-violet-500/30 text-violet-400"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                row.status === "Confirmed" ? "bg-emerald-400" : row.status === "Pending" ? "bg-amber-400" : "bg-violet-400"
                              }`} />
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right">
                            <button className="text-neutral-500 hover:text-white p-1 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Showing 5 of 42 bookings</span>
                <button className="flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                  <span>View All Queue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Active Doctors On Duty (4 cols) */}
            <div className="lg:col-span-4 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Doctors On Duty</h2>
                <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md">
                  4 Active
                </span>
              </div>

              <div className="space-y-3">
                {activeDoctors.map((doc, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-neutral-950/50 border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/10 flex items-center justify-center font-bold text-sm text-fuchsia-400">
                        {doc.name.split(" ")[1][0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{doc.name}</p>
                        <p className="text-[11px] text-neutral-400">{doc.dept}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-emerald-400">{doc.status}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">{doc.patientsToday} patients</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time System Load Box */}
              <div className="pt-2">
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/40 to-neutral-950 border border-violet-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-medium">Slot Capacity Utilization</span>
                    <span className="font-mono text-violet-400 font-bold">84%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full w-[84%]" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}