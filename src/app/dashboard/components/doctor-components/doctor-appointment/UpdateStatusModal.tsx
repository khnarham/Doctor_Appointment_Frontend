'use client';

import React, { useState } from 'react';
import { AppointmentStatus } from '@/types/appointment';
import { X, CheckCircle2, AlertCircle, Clock, XCircle, Loader2 } from 'lucide-react';

interface UpdateStatusModalProps {
  isOpen: boolean;
  currentStatus: AppointmentStatus;
  appointmentId: string;
  onClose: () => void;
  onUpdate: (newStatus: AppointmentStatus) => Promise<void>;
}

const STATUS_OPTIONS: { status: AppointmentStatus; label: string; icon: React.ElementType; color: string }[] = [
  { status: 'CONFIRMED', label: 'Confirm Appointment', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { status: 'COMPLETED', label: 'Mark as Completed', icon: CheckCircle2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { status: 'CANCELLED', label: 'Cancel Appointment', icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-200' },
];

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  currentStatus,
  appointmentId,
  onClose,
  onUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus>(currentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus === currentStatus) return;

    setIsSubmitting(true);
    try {
      await onUpdate(selectedStatus);
      onClose();
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900">Update Clinical Status</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ref ID: <span className="font-mono text-slate-700">{appointmentId.substring(0, 8)}...</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Select New Status</label>
            <div className="grid grid-cols-1 gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedStatus === opt.status;
                return (
                  <button
                    key={opt.status}
                    type="button"
                    onClick={() => setSelectedStatus(opt.status)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected
                        ? `${opt.color} ring-2 ring-indigo-500/30 border-transparent shadow-sm`
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{opt.label}</span>
                    </div>
                    {isSelected && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || selectedStatus === currentStatus}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-teal-200"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply Status'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};