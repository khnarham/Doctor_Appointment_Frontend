"use client";

import { Clock, MapPin, Phone, ShieldAlert, CheckCircle, Navigation } from "lucide-react";

interface ScheduleDay {
  day: string;
  hours: string;
  status: "open" | "limited" | "closed";
}

const SCHEDULE: ScheduleDay[] = [
  { day: "Monday – Friday", hours: "08:00 AM – 10:00 PM", status: "open" },
  { day: "Saturday", hours: "09:00 AM – 08:00 PM", status: "open" },
  { day: "Sunday", hours: "Emergency & On-Call Only", status: "limited" },
];

export function ClinicHours() {
  return (
    <section id="hours" className="py-16 sm:py-20 bg-zinc-50 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200/70 inline-block">
            Visit Our Clinic
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Operating Hours & Location
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            Visit our state-of-the-art facility for in-person consultations or scheduled doctor appointments.
          </p>
        </div>

        {/* 2 Column Layout: Hours Table + Location/Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Weekly Schedule Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Weekly Consultation Hours</h3>
                    <p className="text-xs text-zinc-500 font-medium">OPD & Doctor Slot Timings</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Today
                </div>
              </div>

                <div className="space-y-3">
                {SCHEDULE.map((item) => (
                  <div
                    key={item.day}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-zinc-50/80 border border-zinc-200/60 text-xs sm:text-sm gap-1 sm:gap-0"
                  >
                    <span className="font-semibold text-zinc-800">{item.day}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900">{item.hours}</span>
                      {item.status === "open" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          Regular
                        </span>
                      )}
                      {item.status === "limited" && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                          On-Call
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Prior appointment booking is recommended to avoid waiting lines.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-900 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Clinic Address</h3>
                  <p className="text-xs text-emerald-300/80">Primary Care Center</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                <p className="font-semibold text-white">Aria Health Medical Complex</p>
                <p>Jail Road, Near University Community Centre</p>
                <p>Faisalabad, Punjab, Pakistan</p>
              </div>

              {/* Emergency Helpline Box */}
              <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>24/7 Emergency Helpline</span>
                </div>
                <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>+92 41 111 222 333</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-md"
            >
              <Navigation className="w-4 h-4" />
              Get Directions On Map
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}