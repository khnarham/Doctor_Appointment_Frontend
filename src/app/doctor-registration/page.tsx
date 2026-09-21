import { Suspense } from 'react';
import { DoctorRegistrationForm } from '@/components/doctor-registration/DoctorRegistrationForm';
import { RegistrationHeroPanel } from '@/components/doctor-registration/RegistrationHeroPanel';
import { Loader2 } from 'lucide-react';

export default function DoctorRegistrationPage() {
  return (
    <main className="min-h-screen w-full flex bg-slate-50">
      {/* Left Form Column */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <Suspense
          fallback={
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold py-12">
              <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
              <span>Initializing secure registration gateway...</span>
            </div>
          }
        >
          <DoctorRegistrationForm />
        </Suspense>
      </div>

      {/* Right Visual Panel Column */}
      <RegistrationHeroPanel />
    </main>
  );
}