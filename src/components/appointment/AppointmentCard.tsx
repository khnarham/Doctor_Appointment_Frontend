'use client';

import React, { useState } from 'react';
import { Appointment } from '@/types/appointment';
import { AppointmentStatusBadge } from './AppointmentStatusBadge';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  Hash, 
  Star, 
  X, 
  Send, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import { submitAppointmentReview } from '@/app/api/reviewApi';

interface AppointmentCardProps {
  appointment: Appointment;
  onAddReview?: (reviewPayload: {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
}

// Helper: Convert numeric minutes (e.g., 580) to 24-hour format (e.g., "09:40")
const formatMinutesTo24H = (totalMinutes: number | string): string => {
  const mins = typeof totalMinutes === 'string' ? parseInt(totalMinutes, 10) : totalMinutes;
  
  if (isNaN(mins)) return '00:00';

  const hours = Math.floor(mins / 60) % 24;
  const minutes = mins % 60;

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onAddReview 
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCompleted = appointment.status === 'COMPLETED';

  const formattedStartTime = formatMinutesTo24H(appointment.start_time);
  const formattedEndTime = formatMinutesTo24H(appointment.end_time);

const handleSubmitReview = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!comment.trim() || rating === 0) return;

  setIsSubmitting(true);
  try {
    await submitAppointmentReview({
      patient_id: appointment.patient_id,
      appointment_id: appointment.id,
      rating: rating,
      comment: comment.trim(),
    });

    setIsReviewModalOpen(false);
    setComment('');
    alert('Review submitted successfully!');
  } catch (err: any) {
    const errorMsg = err.response?.data?.error || 'Failed to submit review';
    alert(errorMsg);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-5">
        
        {/* Header: ID & Status Badge */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-1.5 min-w-0 text-slate-400 font-mono text-xs">
            <Hash className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-semibold tracking-tight text-slate-500" title={appointment.id}>
              {appointment.id.substring(0, 8)}...
            </span>
          </div>
          <div className="shrink-0">
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>

        {/* Body: Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="p-2 bg-indigo-100/70 text-indigo-600 rounded-xl shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
              <p className="text-xs font-bold text-slate-800 truncate">{appointment.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="p-2 bg-slate-200/70 text-slate-700 rounded-xl shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timing (24h)</p>
              <p className="text-xs font-bold text-slate-800 truncate">
                {formattedStartTime} - {formattedEndTime}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Metadata Info */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600 min-w-0">
              <Stethoscope className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium truncate" title={appointment.doctor_id}>
                Doc: <span className="font-bold text-slate-700">{appointment.doctor_id.substring(0, 8)}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 min-w-0 sm:justify-end">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium truncate" title={appointment.schedule_id}>
                Schedule: <span className="font-bold text-slate-700">{appointment.schedule_id.substring(0, 8)}</span>
              </span>
            </div>
          </div>

          {/* Action Trigger: Review Button */}
          {isCompleted && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Write Clinical Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Dialog / Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Doctor Feedback</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Rate your consultation experience
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating Star Selection */}
              <div className="space-y-1.5 text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Rating
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform duration-150 hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Detailed Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details regarding diagnosis, punctuality, or doctor's care..."
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 resize-none text-slate-800 placeholder:text-slate-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-indigo-200"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};