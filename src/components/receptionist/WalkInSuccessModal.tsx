'use client';

import React from 'react';
import { CheckCircle2, Phone, Calendar, User, Copy, Check, ArrowRight, PlusCircle } from 'lucide-react';

export interface RegisteredPatientData {
  id: string;
  walk_in_name: string;
  walk_in_phone: string;
  gender: string;
  date_of_birth: string;
  is_walk_in: boolean;
  created_at: string;
}

interface WalkInSuccessModalProps {
  patient: RegisteredPatientData | null;
  isOpen: boolean;
  onClose: () => void;
  onResetForm: () => void;
}

export function WalkInSuccessModal({ patient, isOpen, onClose, onResetForm }: WalkInSuccessModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !patient) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(patient.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        
        {/* Modal Header Badge */}
        <div className="text-center space-y-2">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Patient Registered</h3>
          <p className="text-xs text-slate-500">Walk-in record successfully created in system database.</p>
        </div>

        {/* Details Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-slate-400 font-semibold">System Patient ID</span>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/80 hover:bg-teal-100 transition-colors"
            >
              <span>{patient.id}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Name
            </span>
            <span className="font-bold text-slate-800">{patient.walk_in_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone
            </span>
            <span className="font-bold text-slate-800 font-mono">{patient.walk_in_phone}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of Birth
            </span>
            <span className="font-bold text-slate-800">{patient.date_of_birth}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Gender</span>
            <span className="font-bold text-slate-800 capitalize">{patient.gender.toLowerCase()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => {
              onClose();
              // Navigate to appointment booking page with patient_id pre-filled
              window.location.href = `/receptionist/appointments/book?patient_id=${patient.id}`;
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-colors"
          >
            <span>Proceed to Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onResetForm();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Another Patient</span>
          </button>
        </div>

      </div>
    </div>
  );
}