'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { User, Phone, Calendar, UserCheck, Loader2, AlertCircle } from 'lucide-react';
import { WalkInSuccessModal, RegisteredPatientData } from './WalkInSuccessModal';

interface RegisterWalkInPayload {
  name: string;
  phone: string;
  gender: string;
  date_of_birth: string;
}

async function registerWalkInPatient(payload: RegisterWalkInPayload): Promise<RegisteredPatientData> {
  const res = await api.post('/auth/receptionist/patients/walk-in', payload);
  return res.data?.data;
}

interface WalkInPatientFormProps {
  onSuccessRegistered?: () => void;
}

export function WalkInPatientForm({ onSuccessRegistered }: WalkInPatientFormProps) {
  const [formData, setFormData] = React.useState<RegisterWalkInPayload>({
    name: '',
    phone: '',
    gender: 'Male',
    date_of_birth: '',
  });

  const [formError, setFormError] = React.useState<string | null>(null);
  const [successPatient, setSuccessPatient] = React.useState<RegisteredPatientData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const mutation = useMutation({
    mutationFn: registerWalkInPatient,
    onSuccess: (data) => {
      setFormError(null);
      setSuccessPatient(data);
      setIsModalOpen(true);
      if (onSuccessRegistered) onSuccessRegistered();
    },
    onError: (err: any) => {
      const msg = err.response?.data?.error || 'Failed to register walk-in patient. Please try again.';
      setFormError(msg);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (formError) setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2) {
      setFormError('Patient name must be at least 2 characters long.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Phone number is required for walk-in patient identification.');
      return;
    }
    if (!formData.date_of_birth) {
      setFormError('Date of birth is required.');
      return;
    }

    mutation.mutate(formData);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      gender: 'MALE',
      date_of_birth: '',
    });
    setFormError(null);
  };

  return (
    <>
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5">
        <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Patient Intake Form</h2>
            <p className="text-xs text-slate-500">Provide basic demographic details for walk-in patient entry.</p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full">
            Walk-In Record
          </span>
        </div>

        {formError && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-bold animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Walk-in Patient Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" /> Patient Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ali Raza"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-600" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +923001234567"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
            </div>

            {/* Gender Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" /> Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" /> Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Walk-In Patient...</span>
                </>
              ) : (
                <span>Register Patient Now</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <WalkInSuccessModal
        patient={successPatient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResetForm={handleResetForm}
      />
    </>
  );
}