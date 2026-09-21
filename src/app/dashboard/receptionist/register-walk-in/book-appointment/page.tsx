'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/axios';
import { Doctor } from '@/types/booking';
import { BookingDeskHeader } from '@/components/receptionist-booking/BookingDeskHeader';
import { DoctorFilters, Specialization } from '@/components/receptionist-booking/DoctorFilters';
import { DoctorCard } from '@/components/receptionist-booking/DoctorCard';
import { SlotBookingModal } from '@/components/receptionist-booking/SlotBookingModal';
import { Loader2, AlertCircle, UserX } from 'lucide-react';

async function fetchDoctors(): Promise<Doctor[]> {
  const res = await api.get('/auth/doctors');

    const rawData = res.data.data;
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.doctors)) return rawData.doctors;
  return [];
}

async function fetchSpecializations(): Promise<Specialization[]> {
  const res = await api.get('/auth/list-specialization');
  return res.data?.data || [];
}

export default function ReceptionistBookingPage() {
  const searchParams = useSearchParams();
  const prefilledPatientId = searchParams.get('patient_id') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [maxFee, setMaxFee] = useState(0);

  // Modal State
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Doctors Data
  const {
    data: doctors = [],
    isLoading: isLoadingDoctors,
    isError: isDoctorsError,
  } = useQuery({
    queryKey: ['doctors-list'],
    queryFn: fetchDoctors,
  });

  // Fetch Specializations Data
  const { data: specializations = [] } = useQuery({
    queryKey: ['specializations-list'],
    queryFn: fetchSpecializations,
  });

  // Client-side Filter Engine
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // 1. Search filter
      const matchesSearch =
        searchTerm.trim() === '' ||
        (doc.fullName && doc.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (doc.licenseNumber && doc.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. Specialization filter
      const matchesSpec =
        selectedSpecialization === '' || doc.specializationID === selectedSpecialization;

      // 3. Max Fee Filter
      const matchesFee = maxFee === 0 || doc.consultationFee <= maxFee;

      return matchesSearch && matchesSpec && matchesFee;
    });
  }, [doctors, searchTerm, selectedSpecialization, maxFee]);

  const handleOpenSlotModal = (doctor: Doctor, date: string) => {
    setSelectedDoctor(doctor);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Receptionist Portal Header */}
        <BookingDeskHeader totalDoctorsCount={doctors.length} />

        {/* Doctor Filters Component */}
        <DoctorFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          maxFee={maxFee}
          setMaxFee={setMaxFee}
          specializations={specializations}
        />

        {/* Doctor Cards Grid Area */}
        <main>
          {isLoadingDoctors ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
              <p className="text-xs font-bold">Loading active doctor directory...</p>
            </div>
          ) : isDoctorsError ? (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700 text-xs font-bold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Failed to fetch doctors list. Check network or backend services.</span>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
              <UserX className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Doctors Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No active practitioners matched your current filter selection. Try resetting filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onSelectSlot={handleOpenSlotModal}
                />
              ))}
            </div>
          )}
        </main>

        {/* Slot Selection Modal */}
        <SlotBookingModal
          initialPatientId={prefilledPatientId}
          doctor={selectedDoctor}
          selectedDate={selectedDate}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </div>
  );
}