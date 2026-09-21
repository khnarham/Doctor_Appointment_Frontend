import { UserCheck, Shield, KeyRound, Sparkles } from 'lucide-react';

export function RegisterHeroPanel() {
  return (
    <div className="lg:w-[42%] bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Accent Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md mb-8">
          <Sparkles className="h-3.5 w-3.5 text-teal-400" />
          <span>Front-Desk Onboarding</span>
        </div>

        <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
          Complete Your Staff Account Setup
        </h2>
        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          You have been authorized to join the clinical management platform as a receptionist. Set up your secure credentials to manage desk operations and appointments.
        </p>

        <div className="mt-10 space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-teal-400">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Role-Based Access</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Assigned desk privileges authorized by clinic administration.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-teal-400">
              <KeyRound className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Single-Use Token Verification</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Your invitation token validates your identity instantly.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <UserCheck className="h-3.5 w-3.5 text-emerald-400" /> Authorized Staff Portal
        </span>
        <span>PulseCare System v2.0</span>
      </div>
    </div>
  );
}