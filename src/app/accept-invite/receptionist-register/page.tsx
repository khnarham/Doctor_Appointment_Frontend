import { Suspense } from 'react';
import { Metadata } from 'next';
import { RegisterHeroPanel } from '@/components/receptionist-register/RegisterHeroPanel';
import { RegisterReceptionistForm } from '@/components/receptionist-register/RegisterReceptionistForm';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accept Receptionist Invitation | PulseCare',
  description: 'Complete your receptionist staff registration to join the clinic portal.',
};

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
        <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
        <span>Loading registration token...</span>
      </div>
    </div>
  );
}

export default function ReceptionistRegisterPage() {
  return (
    <div className="min-h-screen w-full bg-slate-50/50 flex flex-col justify-center py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full bg-white rounded-3xl shadow-2xl shadow-slate-900/5 border border-slate-200/80 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side Visual Hero Panel */}
        <RegisterHeroPanel />

        {/* Right Side Form Wrapped in Suspense Boundary */}
        <div className="flex-1 flex items-center border-l border-slate-100">
          <Suspense fallback={<LoadingFallback />}>
            <RegisterReceptionistForm />
          </Suspense>
        </div>

      </div>
    </div>
  );
}