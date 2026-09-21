"use client";

import Link from "next/link";
import { Stethoscope, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-tight">
                  Aria Health
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
                  Primary Care Clinic
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
              Providing seamless doctor appointment scheduling, verified specialist access, and real-time slot bookings for patients.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Jail Road, Faisalabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+92 41 111 222 333</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@ariahealth.pk</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-emerald-400 transition-colors">Specialties</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-emerald-400 transition-colors">Popular Doctors</a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#hours" className="hover:text-emerald-400 transition-colors">Clinic Hours</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Top Specialties</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Cardiology</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pediatrics</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Neurology</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Orthopedics</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">General Medicine</li>
            </ul>
          </div>

          {/* Column 4: Patient Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Patient Portal</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Patient Sign In <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Create Account <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                  Doctor Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Aria Health Primary Care. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">HIPAA / Data Protection</span>
          </div>
        </div>

      </div>
    </footer>
  );
}