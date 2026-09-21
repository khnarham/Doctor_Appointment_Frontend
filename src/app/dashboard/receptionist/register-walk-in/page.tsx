'use client';

import React from 'react';
import { ReceptionistHeader } from '@/components/receptionist/ReceptionistHeader';
import { WalkInPatientForm } from '@/components/receptionist/WalkInPatientForm';

export default function RegisterWalkInPatientPage() {
  const [todayCount, setTodayCount] = React.useState(0);

  const handlePatientRegistered = () => {
    setTodayCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Custom Receptionist Header */}
        <ReceptionistHeader todayRegistrationsCount={todayCount} />

        {/* Main Registration Form */}
        <main>
          <WalkInPatientForm onSuccessRegistered={handlePatientRegistered} />
        </main>

      </div>
    </div>
  );
}