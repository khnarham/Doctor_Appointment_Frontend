import { UserPlus, CheckCircle2 } from 'lucide-react';

export function InviteInfoCard() {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 text-white shadow-xl lg:p-10 border border-slate-800">
      <div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
          <UserPlus className="h-6 w-6" />
        </div>
        <h2 className="mt-8 text-xl font-bold tracking-tight">
          Streamlined Onboarding
        </h2>
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
          Doctors will receive a unique secure access link via email to complete their credentials verification and slot schedule configuration.
        </p>

        <div className="mt-10 space-y-5">
          <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>Instant email invitation with secure token</span>
          </div>
          <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>Automated schedule & slot allocation setup</span>
          </div>
          <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <span>Role-based access control (RBAC) ready</span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800/80 pt-6 text-xs text-slate-400">
        Need help? Contact system administration or read{' '}
        <a href="#" className="text-indigo-400 font-semibold hover:underline">
          invitation docs
        </a>.
      </div>
    </div>
  );
}