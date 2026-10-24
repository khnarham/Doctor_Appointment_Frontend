"use client";

import { useState } from "react";
import { DoctorCard, Doctor } from "./DoctorCard";

// Testing Mock Data (No API required)
const MOCK_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiology",
    experienceYears: 12,
    availableToday: true,
    avatarUrl: "/doctors/sarah.jpg",
  },
  {
    id: "doc-2",
    name: "Dr. Ali Hassan",
    specialty: "Neurology",
    experienceYears: 8,
    availableToday: false,
    avatarUrl: "/doctors/ali.jpg",
  },
  {
    id: "doc-3",
    name: "Dr. Ayesha Malik",
    specialty: "Pediatrics",
    experienceYears: 15,
    availableToday: true,
    avatarUrl: "/doctors/ayesha.jpg",
  },
  {
    id: "doc-4",
    name: "Dr. Usman Bilal",
    specialty: "Dermatology",
    experienceYears: 10,
    availableToday: true,
    avatarUrl: "/doctors/usman.jpg",
  },
  {
    id: "doc-5",
    name: "Dr. Fatima Raza",
    specialty: "Cardiology",
    experienceYears: 6,
    availableToday: false,
    avatarUrl: "/doctors/fatima.jpg",
  },
];

const SPECIALTIES = ["All", "Cardiology", "Neurology", "Pediatrics", "Dermatology"];

export function DoctorsSection() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  // Pure array filter logic for instant UI responsiveness
  const filteredDoctors = MOCK_DOCTORS.filter((doctor) =>
    selectedSpecialty === "All" ? true : doctor.specialty === selectedSpecialty
  );

  return (
    <section id="doctors" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Meet Our Specialists
          </h2>
          <p className="text-slate-600 mt-2">
            Select a specialty to filter our active clinic doctors.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedSpecialty === spec
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="text-slate-500 text-center py-12 border border-dashed border-slate-200 rounded-2xl">
          No doctors found for {selectedSpecialty}.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}
    </section>
  );
}