'use client';

import React, { useState } from 'react';
import { Doctor } from '@/types/booking';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Clock, Calendar, Check, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore'; // 👈 Zustand Store import
import { PatientProfile } from '@/app/doctors/page';

export interface TimeSlotOutput {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

interface SlotBookingModalProps {
  patient: PatientProfile | null; // 👈 Add patient prop
  doctor: Doctor | null;
  selectedDate: string;
  isOpen: boolean;
  onClose: () => void;
}

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
  patient,
  doctor,
  selectedDate,
  isOpen,
  onClose,
}: SlotBookingModalProps) {
  const queryClient = useQueryClient();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotOutput | null>(null);

  const user = useAuthStore((state) => state.user);

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
      queryClient.invalidateQueries({ queryKey: ['patient-appointments'] });
      setSelectedSlot(null);
      onClose();
      alert('Appointment booked successfully!');
    },
  });

  if (!isOpen || !doctor) return null;

  console.log("patient" , patient)

  const handleBooking = () => {
    if (!selectedSlot) return;

    const patientId = patient?.id; 
    if (!patientId) {
      alert('User session not found. Please log in again.');
      return;
    }

    bookingMutation.mutate({
      patient_id: patientId,
      doctor_id: doctor.id,
      date: selectedDate,
      start_time: selectedSlot.startTime,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">Select Time Slot</h3>
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-600" />
              <span>{selectedDate}</span> • <span>Dr. License #{doctor.licenseNumber}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-xs font-bold">Loading available slots...</p>
            </div>
          ) : isError ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-semibold">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>
                {(error as any)?.response?.data?.error ||
                  (error as Error)?.message ||
                  'Could not fetch slots.'}
              </span>
            </div>
          ) : slots.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Clock className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold">No available slots for this date.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
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
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
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

        {/* Mutation Error Feedback */}
        {bookingMutation.isError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              {(bookingMutation.error as any)?.response?.data?.error ||
                'Booking failed. Please try again.'}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400">Consultation Fee</p>
            <p className="text-base font-black text-slate-900">${doctor.consultationFee}</p>
          </div>

          <button
            disabled={!selectedSlot || bookingMutation.isPending}
            onClick={handleBooking}
            className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-md shadow-indigo-200"
          >
            {bookingMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
}