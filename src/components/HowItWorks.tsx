"use client";

import { UserCheck, CalendarCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badgeText: string;
}

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Find Your Specialist",
    description:
      "Browse through verified doctors by specialty, qualification, or fee structure that fits your healthcare needs.",
    icon: UserCheck,
    badgeText: "Step 1",
  },
  {
    number: "02",
    title: "Select Time Slot",
    description:
      "View live calendar availability and pick an exact time slot without dealing with long queue delays.",
    icon: CalendarCheck,
    badgeText: "Step 2",
  },
  {
    number: "03",
    title: "Instant Confirmation",
    description:
      "Receive immediate booking confirmation via SMS/Notification and visit the clinic hassle-free.",
    icon: CheckCircle2,
    badgeText: "Step 3",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
            Seamless Booking
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight">
            How It Works In 3 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            No long waiting lines or phone calls. Book your appointment in less than 60 seconds.
          </p>
        </div>

        {/* 3 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-zinc-50/70 hover:bg-white p-7 sm:p-8 rounded-3xl border border-zinc-200/80 hover:border-emerald-500/40 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between group"
              >
                <div>
                  {/* Step Header: Icon + Large Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-zinc-300 group-hover:text-emerald-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-emerald-100 inline-block mb-3">
                    {step.badgeText}
                  </span>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Subtitle Accent Line */}
                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center text-xs font-semibold text-emerald-600">
                  <span>Fast & Secure</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <Link
            href="#doctors"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <span>Book Your Slot Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}