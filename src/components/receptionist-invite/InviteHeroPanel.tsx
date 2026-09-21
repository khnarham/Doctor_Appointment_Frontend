import { UserPlus, ShieldCheck, CheckCircle2, UserCheck, Sparkles, Stethoscope } from 'lucide-react';

export function InviteHeroPanel() {
  return (
    <div className="hidden lg:flex relative flex-1 bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 p-12 flex-col justify-between overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Branding */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 backdrop-blur-md shadow-inner">
          <Stethoscope className="h-5 w-5" />
        </div>
        <div>
          <span className="text-lg font-black text-white tracking-wide block leading-none">PulseCare</span>
          <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest">Front-Desk Operations</span>
        </div>
      </div>

      {/* Middle Interactive Card */}
      <div className="relative z-10 my-auto py-6">
        <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/60 backdrop-blur-md group hover:border-slate-700 transition-all duration-300">
          
          {/* Decorative Visual Illustration */}
          <div className="relative h-56 w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-6 text-center border-b border-slate-800">
            <div className="absolute w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 p-4 rounded-2xl bg-slate-900/80 border border-teal-500/30 text-teal-400 mb-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <UserCheck className="h-10 w-10" />
            </div>

            <div className="relative z-10 text-slate-200 text-xs font-bold tracking-wide">
              Desk Staff Invitation Gateway
            </div>
            <span className="relative z-10 text-[11px] text-slate-400 mt-1">
              Issue secure access tokens for administrative onboarding
            </span>

            {/* Badge */}
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-teal-500/30 text-teal-300 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="h-3 w-3 text-teal-400 animate-pulse" />
              <span>Instant Token Dispatch</span>
            </div>
          </div>

          {/* Card Context */}
          <div className="p-6 bg-slate-900/90">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
              <UserPlus className="h-4 w-4" />
              <span>Identity & Access Setup</span>
            </div>
            <h3 className="text-lg font-extrabold text-white leading-snug">
              Invite receptionists to streamline patient queues and slot bookings
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Invited members receive secure single-use access credentials via email to complete their account registration.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Security Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
          <CheckCircle2 className="h-4.5 w-4.5 text-teal-400 shrink-0" />
          <span>Verified Onboarding</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
          <ShieldCheck className="h-4.5 w-4.5 text-teal-400 shrink-0" />
          <span>Secure Token Link</span>
        </div>
      </div>
    </div>
  );
}