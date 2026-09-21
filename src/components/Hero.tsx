"use client";

import Link from "next/link";
import { Search, Calendar, Star, ShieldCheck, Clock, UserCheck } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-zinc-50 pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24">
      {/* Background Glows - Hidden on Mobile/Small screens, visible on Medium+ */}
      <div className="hidden md:block absolute top-0 right-1/4 -z-10 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-4 left-10 -z-10 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT CONTENT COLUMN: Centered on Mobile/Small, Left-aligned on Desktop (lg:) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-50/90 border border-emerald-200/90 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold text-emerald-900 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="tracking-wide">Instant Doctor Appointments • Zero Wait Time</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-3xl lg:text-5xl font-extrabold sm:max-w-xl text-zinc-950 leading-tight tracking-tight">
              Your Health Deserves{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Expert Medical Care
              </span>{" "}
              Without Delay.
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-md text-zinc-600/95 max-w-xl leading-relaxed font-normal">
              Connect with top-rated primary care specialists, view real-time available time slots, and schedule your appointment in seconds. No waiting lines, no hassle.
            </p>

            {/* Quick Interactive Search / Action Bar */}
            <div className="w-full max-w-lg bg-white p-2 rounded-2xl border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full flex items-center">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search doctor, specialty (e.g. Cardiologist)..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm font-medium text-zinc-900 placeholder-zinc-400 bg-zinc-50/60 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white focus:outline-hidden transition-all"
                />
              </div>
              <Link
                href="#doctors"
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Find Doctor
              </Link>
            </div>

            {/* Key Metrics / Micro Proof */}
            <div className="pt-4 grid grid-cols-3 gap-4 sm:gap-8 border-t border-zinc-200/80 w-full max-w-lg">
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">15k+</div>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">Patients Served</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">50+</div>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">Verified Doctors</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">User Rating</p>
              </div>
            </div>

          </div>

          {/* RIGHT VISUAL COLUMN */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            
            {/* Background Image Glow Ring - Only on Medium+ screens */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-tr from-emerald-500/15 to-teal-500/10 rounded-3xl transform rotate-1 scale-102 blur-xs" />

            {/* Main Visual Image Card */}
            <div className="relative w-full max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop"
                alt="Doctor examining patient with care"
                className="w-full h-[340px] sm:h-[420px] object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Floating Overlay Card 1: Certified Specialists */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">PMDC Verified</p>
                  <p className="text-[11px] font-medium text-zinc-500">Certified Specialists</p>
                </div>
              </div>

              {/* Floating Overlay Card 2: Instant Booking Status */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-900">Instant Slots</p>
                  <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Direct Confirmation
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}