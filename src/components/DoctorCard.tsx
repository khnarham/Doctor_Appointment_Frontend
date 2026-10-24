import { Calendar, CheckCircle2 } from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  availableToday: boolean;
  avatarUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xl">
            {/* Image placeholder avatar initial for clean offline testing */}
            {doctor.name.split(" ").map((n) => n[0]).join("")}
          </div>
          {doctor.availableToday && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available Today
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mt-4">{doctor.name}</h3>
        <p className="text-sm font-medium text-teal-700">{doctor.specialty}</p>
        <p className="text-xs text-slate-500 mt-1">
          {doctor.experienceYears}+ Years Clinical Experience
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-teal-600" /> Clinic Verified
        </span>
        <button className="inline-flex items-center gap-2 bg-slate-900 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer">
          <Calendar className="w-4 h-4" /> Book Slot
        </button>
      </div>
    </div>
  );
}