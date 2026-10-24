import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InvitationAlertsProps {
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}

export function InvitationAlerts({ isSuccess, isError, errorMessage }: InvitationAlertsProps) {
  if (isSuccess) {
    return (
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in duration-200">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
        <span>Doctor invitation link successfully dispatched to the inbox!</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs font-semibold animate-in fade-in duration-200">
        <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
        <span>{errorMessage || 'Failed to dispatch doctor invitation.'}</span>
      </div>
    );
  }

  return null;
}