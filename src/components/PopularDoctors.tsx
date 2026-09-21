"use client";

import Link from "next/link";
import { Star, ShieldCheck, Clock, Calendar, ChevronRight, User } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  nextSlot: string;
  imageUrl: string;
  availableToday: boolean;
}

const TOP_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Mansoor",
    specialty: "Cardiologist",
    qualification: "MBBS, FCPS (Cardiology)",
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 320,
    fee: 2500,
    nextSlot: "Today, 05:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    availableToday: true,
  },
  {
    id: "doc-2",
    name: "Dr. Tariq Mahmood",
    specialty: "Neurologist",
    qualification: "MBBS, MD (Neurology)",
    experienceYears: 16,
    rating: 4.8,
    reviewCount: 285,
    fee: 3000,
    nextSlot: "Today, 06:15 PM",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop",
    availableToday: true,
  },
  {
    id: "doc-3",
    name: "Dr. Hannibal Lecter",
    specialty: "Pediatrician",
    qualification: "MBBS, DCH, FCPS",
    experienceYears: 9,
    rating: 5.0,
    reviewCount: 410,
    fee: 2000,
    nextSlot: "Tomorrow, 10:00 AM",
    // Updated Working Image URL
    imageUrl: "https://images.unsplash.com/photo-1594824813566-88855ce78341?q=80&w=800&auto=format&fit=crop",
    availableToday: false,
  },
];

export function PopularDoctors() {
  return (
    <section id="doctors" className="py-16 sm:py-20 bg-zinc-50 border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200/70 inline-block">
              Top Rated Specialists
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Featured High-Rating Doctors
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl font-normal">
              Book consultations with highly experienced primary healthcare providers trusted by thousands of patients.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start md:self-auto"
          >
            View All Doctors <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOP_DOCTORS.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl border border-zinc-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Image Header with Fallback */}
                <div className="relative h-56 w-full bg-zinc-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    onError={(e) => {
                      // Fallback image if Unsplash fails to load
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-zinc-100 shadow-2xs flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${doctor.availableToday ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                    <span className="text-xs font-semibold text-zinc-800">
                      {doctor.availableToday ? "Available Today" : "Next Available"}
                    </span>
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 right-3 bg-zinc-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-zinc-400 font-normal">({doctor.reviewCount})</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>PMDC Verified • {doctor.experienceYears} Years Exp.</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 mt-0.5">
                      {doctor.qualification} — <span className="text-zinc-800 font-semibold">{doctor.specialty}</span>
                    </p>
                  </div>

                  {/* Fee & Slot Details */}
                  <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-500 block">Consultation Fee</span>
                      <span className="text-sm font-extrabold text-zinc-900">PKR {doctor.fee}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 block flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3 text-emerald-600" /> Next Slot
                      </span>
                      <span className="text-xs font-bold text-emerald-800">{doctor.nextSlot}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="p-6 pt-0">
                <Link
                  href={`/book/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3 rounded-xl shadow-2xs hover:shadow-md transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}