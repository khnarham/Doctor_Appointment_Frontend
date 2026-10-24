import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { InviteDoctorHeader } from '../../components/doctor-components/doctor-invitation/InviteDoctorHeader';
import { InviteInfoCard } from '../../components/doctor-components/doctor-invitation/InviteInfoCard';
import { InviteDoctorForm } from '../../components/doctor-components/doctor-invitation/InviteDoctorForm';

export const metadata: Metadata = {
  title: 'Invite Doctor | Dashboard',
  description: 'Invite new medical professionals to join the platform.',
};

export default function InviteDoctorPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      
      {/* 1. Card-Style Header (Matching ScheduleHeader Design) */}
      <InviteDoctorHeader />

      {/* 2. Form & Info Section */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Dark Info Card */}
          <div className="lg:col-span-5 flex">
            <InviteInfoCard />
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
              <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Invitation Details</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Fill in the required fields to dispatch the invite.</p>
                </div>
              </div>

              {/* Form Render */}
              <InviteDoctorForm />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}