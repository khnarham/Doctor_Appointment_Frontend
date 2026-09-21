'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/types/booking';
import { Loader2, AlertCircle, UserX } from 'lucide-react';
import { api } from '@/lib/axios';
import { DoctorFilters } from '@/components/patient/DoctorFilterBar';
import { DoctorCard } from '@/components/patient/DoctorCard';
import { SlotBookingModal } from '@/components/patient/SlotBookingModal';
import { ListSpecialization } from '../api/specialization';

export interface PatientProfile {
  id: string;
  user_id?: string;
  walk_in_name?: string;
  walk_in_phone?: string;
  gender?: string;
  date_of_birth?: string;
  is_walk_in?: boolean;
  created_at?: string;
}

interface DoctorQueryParams {
  search?: string;
  specializationID?: string;
  maxFee?: number;
  page?: number;
  limit?: number;
}

async function fetchDoctors(params: DoctorQueryParams): Promise<Doctor[]> {
  const res = await api.get('/auth/doctors', {
    params: {
      search: params.search || undefined,
      specializationID: params.specializationID || undefined,
      maxFee: params.maxFee && params.maxFee > 0 ? params.maxFee : undefined,
      page: params.page || 1,
      limit: params.limit || 10,
    },
  });

  if (!res.data?.success) throw new Error('Failed to fetch doctors list');
  
  const rawData = res.data.data;
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.doctors)) return rawData.doctors;
  return [];
}

// 1. Fetch Patient Profile via Endpoint
async function fetchCurrentPatient(): Promise<PatientProfile | null> {
  const res = await api.get('/auth/patients/me');
  return res.data?.data || null;
}

export default function PatientDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [maxFee, setMaxFee] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Query for Patient Profile (Authenticated user)
  const { data: patient = null, isLoading: isPatientLoading } = useQuery({
    queryKey: ['current-patient'],
    queryFn: fetchCurrentPatient,
    staleTime: 1000 * 60 * 10, // 10 mins cache
  });
 
  console.log("patient2.0" , patient)
  const {
    data: doctors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['patient-doctors-list', searchTerm, selectedSpecialization, maxFee, page],
    queryFn: () =>
      fetchDoctors({
        search: searchTerm,
        specializationID: selectedSpecialization,
        maxFee: maxFee,
        page: page,
        limit: 10,
      }),
    staleTime: 1000 * 60 * 2,
  });

  const { data: specializations = [] } = useQuery({
    queryKey: ['specializations'],
    queryFn: ListSpecialization,
  });

  const handleOpenSlots = (doctor: Doctor, date: string) => {
    setActiveDoctor(doctor);
    setBookingDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Find Your Specialist
        </h1>
        <p className="text-xs font-bold text-slate-500 mt-1">
          Book real-time clinical consultations with verified medical practitioners.
        </p>
      </div>

      <DoctorFilters
        searchTerm={searchTerm}
        setSearchTerm={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={(val) => {
          setSelectedSpecialization(val);
          setPage(1);
        }}
        maxFee={maxFee}
        setMaxFee={(val) => {
          setMaxFee(val);
          setPage(1);
        }}
        specializations={specializations}
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-bold text-slate-500">Searching Doctors...</p>
        </div>
      ) : isError ? (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-rose-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-semibold">
            {(error as Error)?.message || 'Failed to load doctors list.'}
          </p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200/80 rounded-3xl space-y-3">
          <UserX className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Doctors Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or price thresholds to see active doctors.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onSelectSlot={handleOpenSlots} />
          ))}
        </div>
      )}

      {/* 3. Patient prop direct pass kar diya */}
      <SlotBookingModal
        patient={patient}
        doctor={activeDoctor}
        selectedDate={bookingDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}