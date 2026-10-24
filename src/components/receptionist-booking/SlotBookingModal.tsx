'use client';

import React, { useState, useEffect } from 'react';
import { Doctor } from '@/types/booking';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Clock, Calendar, Check, Loader2, AlertCircle, User, Search } from 'lucide-react';
import { api } from '@/lib/axios';

export interface TimeSlotOutput {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface SlotBookingModalProps {
  initialPatientId?: string;
  doctor: Doctor | null;
  selectedDate: string;
  isOpen: boolean;
  onClose: () => void;
}

// Standard schedule slot endpoint
async function fetchSlots(doctorId: string, targetDate: string): Promise<TimeSlotOutput[]> {
  const res = await api.post('/schedules/slots', {
    doctor_id: doctorId,
    target_date: targetDate,
  });

  const responseData = res.data?.data;
  const rawSlots = responseData?.Slots || responseData?.slots || [];

  return rawSlots.map((s: any) => ({
    startTime: s.startTime || s.StartTime || '',
    endTime: s.endTime || s.EndTime || '',
    isBooked: s.isBooked ?? s.IsBooked ?? false,
  }));
}

// Standard appointment booking endpoint
async function bookAppointment(payload: {
  patient_id: string;
  doctor_id: string;
  date: string;
  start_time: string;
}) {
  const res = await api.post('/appointments', payload);
  return res.data;
}

export function SlotBookingModal({
  initialPatientId = '',
  doctor,
  selectedDate,
  isOpen,
  onClose,
}: SlotBookingModalProps) {
  const queryClient = useQueryClient();
  const [patientIdInput, setPatientIdInput] = useState<string>(initialPatientId);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotOutput | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPatientId) {
      setPatientIdInput(initialPatientId);
    }
  }, [initialPatientId]);

  // Fetch Slots Query
  const {
    data: slots = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['doctor-slots', doctor?.id, selectedDate],
    queryFn: () => fetchSlots(doctor!.id, selectedDate),
    enabled: isOpen && !!doctor?.id && !!selectedDate,
  });

  const bookingMutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-slots'] });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      setSelectedSlot(null);
      onClose();
      alert('Appointment successfully booked for Patient!');
    },
  });

  if (!isOpen || !doctor) return null;

  const handleBooking = () => {
    setValidationError(null);

    if (!patientIdInput.trim()) {
      setValidationError('Patient ID is required. Enter a valid Patient UUID.');
      return;
    }

    if (!selectedSlot) {
      setValidationError('Please select a time slot first.');
      return;
    }

    bookingMutation.mutate({
      patient_id: patientIdInput.trim(),
      doctor_id: doctor.id,
      date: selectedDate,
      start_time: selectedSlot.startTime,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200/80">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-black text-slate-900">Book Patient Slot</h3>
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1">
              <Calendar className="h-3.5 w-3.5 text-teal-600" />
              <span>{selectedDate}</span> • <span>Dr. {doctor.fullName || `License #${doctor.licenseNumber}`}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Receptionist Specific Patient ID Field */}
        <div className="space-y-1.5 bg-teal-50/50 p-4 rounded-2xl border border-teal-200/60">
          <label className="text-xs font-black text-teal-900 flex items-center gap-1.5 uppercase tracking-wider">
            <User className="h-3.5 w-3.5 text-teal-600" /> Target Patient ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={patientIdInput}
              onChange={(e) => {
                setPatientIdInput(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Paste or type Patient UUID (e.g. 8f12c...)"
              className="w-full px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
            />
          </div>
          <p className="text-[10px] text-teal-700 font-medium">
            Enter the patient's system ID. If walk-in, register them first to get an ID.
          </p>
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Time Slot Picker Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Available Schedule Slots</h4>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
              <p className="text-xs font-bold">Fetching doctor's shift slots...</p>
            </div>
          ) : isError ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-semibold">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>
                {(error as any)?.response?.data?.error ||
                  (error as Error)?.message ||
                  'Could not fetch schedule slots.'}
              </span>
            </div>
          ) : slots.length === 0 ? (
            <div className="py-10 text-center text-slate-500 space-y-2 bg-slate-50 rounded-2xl border border-slate-100">
              <Clock className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold">No slots generated or available for this date.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {slots.map((slot, idx) => {
                const isSelected =
                  selectedSlot?.startTime === slot.startTime &&
                  selectedSlot?.endTime === slot.endTime;

                const slotKey =
                  slot.startTime && slot.endTime
                    ? `${slot.startTime}-${slot.endTime}`
                    : `slot-${idx}`;

                return (
                  <button
                    key={slotKey}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition ${
                      slot.isBooked
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60'
                        : isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                    }`}
                  >
                    <span>{slot.startTime}</span>
                    <span className="text-[10px] opacity-75">{slot.endTime}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mutation Feedback */}
        {bookingMutation.isError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              {(bookingMutation.error as any)?.response?.data?.error ||
                'Booking process failed.'}
            </span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Consultation Fee</p>
            <p className="text-base font-black text-slate-900">Rs. {doctor.consultationFee}</p>
          </div>

          <button
            disabled={!selectedSlot || bookingMutation.isPending}
            onClick={handleBooking}
            className="py-3 px-6 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-md shadow-teal-600/20"
          >
            {bookingMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>Confirm Booking</span>
          </button>
        </div>

      </div>
    </div>
  );
}