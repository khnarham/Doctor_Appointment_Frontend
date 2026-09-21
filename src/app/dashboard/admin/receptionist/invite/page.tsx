import { InviteHeroPanel } from '@/components/receptionist-invite/InviteHeroPanel';
import { InviteReceptionistForm } from '@/components/receptionist-invite/InviteReceptionistForm';
import { LayoutDashboard, Users, UserPlus, ChevronRight, CheckCircle2, History } from 'lucide-react';
import Link from 'next/link';

// Production Ready Page Wrapper
export default function InviteReceptionistPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      
      {/* --- Section 1: Top Navigation & Context Header --- */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-screen-2xl mx-auto px-5 py-4">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-slate-500 text-xs mb-3">
            <Link href="/admin/dashboard" className="hover:text-teal-600 flex items-center gap-1.5 transition-colors">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/admin/staff" className="hover:text-teal-600 flex items-center gap-1.5 transition-colors">
              <Users className="h-3.5 w-3.5" />
              <span>Staff Management</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <div className="text-slate-800 font-medium flex items-center gap-1.5">
              <UserPlus className="h-3.5 w-3.5 text-teal-600" />
              <span>Invite Desk Staff</span>
            </div>
          </nav>

          {/* Main Title Area */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Onboard New Receptionist</h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Generate secure, single-use authentication tokens to invite front-desk personnel to your clinical network via email.
              </p>
            </div>

            {/* Quick Action Status / Secondary Navigation (Optional) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Active Link: doctor-portal.com</span>
              </div>
              <Link href="/admin/staff/invitations" className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all active:scale-95 shadow-sm">
                <History className="h-4 w-4 text-teal-600" />
                <span>View Recent Invites</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- Section 2: Main Content Area (Form & Visuals) --- */}
      <main className="flex-1 flex flex-col justify-center py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto w-full bg-white rounded-3xl shadow-2xl shadow-slate-900/5 border border-slate-200/70 overflow-hidden flex flex-col lg:flex-row min-h-[640px] animate-in fade-in zoom-in-95 duration-300">
          
          {/* Left Side Visual Hero Panel (Imported Component) */}
          <InviteHeroPanel />

          {/* Right Side Form (Imported Component) */}
          <div className="flex-1 flex items-center border-l border-slate-100/50">
            <InviteReceptionistForm />
          </div>
        </div>
      </main>

      {/* --- Section 3: Simple Footer (Optional) --- */}
      <footer className="py-5 px-5 text-center border-t border-slate-100 bg-white mt-auto">
        <p className="text-[11px] text-slate-400">
          PulseCare Clinical Engine © 2026 • Secure Staff Onboarding Module • PMDC Compliant
        </p>
      </footer>
    </div>
  );
}