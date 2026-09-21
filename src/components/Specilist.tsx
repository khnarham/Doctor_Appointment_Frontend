"use client";

import { 
  HeartPulse, 
  Brain, 
  Baby, 
  Stethoscope, 
  Bone, 
  Eye, 
  Activity, 
  ArrowRight 
} from "lucide-react";

interface Specialty {
  id: string;
  title: string;
  description: string;
  doctorCount: number;
  icon: React.ElementType;
}

const SPECIALTIES: Specialty[] = [
  {
    id: "cardiology",
    title: "Cardiology",
    description: "Heart care, blood pressure control & ECG diagnostics.",
    doctorCount: 8,
    icon: HeartPulse,
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description: "Child healthcare, vaccinations & growth monitoring.",
    doctorCount: 12,
    icon: Baby,
  },
  {
    id: "neurology",
    title: "Neurology",
    description: "Brain, nerve disorders, spine & headache treatment.",
    doctorCount: 6,
    icon: Brain,
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    description: "Bone health, joint replacements & sports injuries.",
    doctorCount: 10,
    icon: Bone,
  },
  {
    id: "general-medicine",
    title: "General Medicine",
    description: "Comprehensive primary care, fever & seasonal illness.",
    doctorCount: 15,
    icon: Stethoscope,
  },
  {
    id: "ophthalmology",
    title: "Ophthalmology",
    description: "Eye vision testing, cataract & laser care.",
    doctorCount: 5,
    icon: Eye,
  },
];

export function Specialties() {
  return (
    <section id="specialties" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
            Medical Departments
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 tracking-tight">
            Explore By Clinical Specialties
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            Access certified primary care doctors across top medical departments with instant booking availability.
          </p>
        </div>

        {/* Responsive Grid with Minimal Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SPECIALTIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-zinc-50/70 hover:bg-white rounded-2xl p-6 border border-zinc-200/80 hover:border-emerald-500/40 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold text-zinc-500 group-hover:text-emerald-700">
                  <span>{item.doctorCount} Verified Doctors</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}