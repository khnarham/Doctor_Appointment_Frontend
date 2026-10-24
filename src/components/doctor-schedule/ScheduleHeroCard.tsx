import { Calendar, Clock2, Zap, ShieldCheck } from 'lucide-react';

export function ScheduleHeroCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
          <Clock2 className="h-4 w-4 text-teal-400" />
          <span>24-Hour Time Precision</span>
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Automated Doctor Slot Engine
          </h2>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Specify clinical working shifts using exact 24-hour timing formats. Our system automatically divides shifts into contiguous booking slots for real-time patient reservations.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Zero Overlap Protection</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Database level BCNF isolation prevents double booking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">24-Hour Standard Time</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Uses `00:00` to `24:00` notation for clean DB parsing.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-teal-400" /> Shift Management Engine
        </span>
        <span>PulseCare v2.0</span>
      </div>
    </div>
  );
}