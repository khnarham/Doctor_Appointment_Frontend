'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Search,
  UserCheck,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Stethoscope,
  X,
} from 'lucide-react';
import { SpecializationBadgeList } from './SpecializationBadgeList';
import { api } from '@/lib/axios';

interface DoctorQueryParams {
  search?: string;
  specializationID?: string;
  maxFee?: number;
  page?: number;
  limit?: number;
}

export interface Doctor {
  id: string;
  userID: string;
  licenseNumber: string;
  consultationFee: number;
  specializationID: string;
  specializationName?: string;
  isAvailable: boolean;
  status: 'ACTIVE' | 'INACTIVE' | string;
  createdAt: string;
  updatedAt: string;
}



interface Specialization {
  id: string;
  name: string;
}

// Axios params handling and backend payload extractor
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

  const resData = res.data;
  if (!resData?.success) {
    throw new Error(resData?.message || 'Failed to fetch doctors list');
  }

  const rawData = resData.data;
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.doctors)) return rawData.doctors;
  return [];
}

async function ListSpecialization(): Promise<Specialization[]> {
  try {
    const res = await api.get('/auth/list-specialization');
    if (!res.data?.success) return [];
    return res.data.data || [];
  } catch (err) {
    console.error('Failed to load specializations:', err);
    return [];
  }
}

export const DoctorDirectoryCard = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [maxFee, setMaxFee] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Doctors Query
  const {
    data: doctors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['patient-doctors-list', debouncedSearch, selectedSpecialization, maxFee, page],
    queryFn: () =>
      fetchDoctors({
        search: debouncedSearch,
        specializationID: selectedSpecialization,
        maxFee: maxFee,
        page: page,
        limit: 10,
      }),
    staleTime: 1000 * 60 * 2,
  });

  // Specializations Query
  const { data: specializations = [] } = useQuery({
    queryKey: ['specializations'],
    queryFn: ListSpecialization,
  });

  const formatCurrency = (amount?: number | null): string => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return '0';
    }
    return amount.toLocaleString();
  };

  const getSpecializationName = (doc: Doctor) => {
    const found = specializations.find((s) => s.id === doc.specializationID);
    return found ? found.name : 'General Medical';
  };
  console.log("doctorNamedata:" , doctors)

  return (
    <div className="space-y-4">
      {/* Specialization Filter Badges */}
      <SpecializationBadgeList
        specializations={specializations}
        selectedSpecialization={selectedSpecialization}
        onSelectSpecialization={(id) => {
          setSelectedSpecialization(id);
          setPage(1);
        }}
      />

      {/* Main Directory Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Card Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Registered Doctors Directory</h2>
              <p className="text-xs text-slate-500">Live practitioner catalog & status verification</p>
            </div>
          </div>

          {/* Search and Max Fee Inputs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name/license..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white w-48 font-medium transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400 font-medium">Max Fee:</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 -mr-1" />
              <input
                type="number"
                placeholder="0"
                value={maxFee || ''}
                onChange={(e) => {
                  setMaxFee(Number(e.target.value));
                  setPage(1);
                }}
                className="w-16 bg-transparent text-xs font-mono font-bold text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Directory Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-slate-400 text-xs font-semibold">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Fetching Practitioners...</span>
          </div>
        ) : isError ? (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{(error as Error)?.message || 'Failed to load doctors list'}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-3">DOCTOR ID</th>
                  <th className="py-3 px-3">LICENSE</th>
                  <th className="py-3 px-3">SPECIALIZATION</th>
                  <th className="py-3 px-3">CONSULTATION FEE</th>
                  <th className="py-3 px-3 text-right">AVAILABILITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.length > 0 ? (
                  doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3 font-medium text-slate-900">
                        <span className="font-mono text-slate-600">{doc.id ? `${doc.id.slice(0, 10)}...` : 'N/A'}</span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-600">{doc.licenseNumber || 'N/A'}</td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <Stethoscope className="w-3 h-3 text-emerald-600" />
                          {getSpecializationName(doc)}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900 text-sm">
                        Rs. {formatCurrency(doc.consultationFee)}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            doc.isAvailable ?? true
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {doc.isAvailable ?? true ? 'Active' : 'On Leave'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                      No doctors found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">Page {page}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={doctors.length < 10}
              className="p-1.5 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-40 hover:bg-slate-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};