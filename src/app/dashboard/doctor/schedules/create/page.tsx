import { Metadata } from 'next';
import { ScheduleHeader } from '@/components/doctor-schedule/ScheduleHeader';
import { CreateScheduleForm } from '@/components/doctor-schedule/CreateScheduleForm';
import { ScheduleHeroCard } from '@/components/doctor-schedule/ScheduleHeroCard';

export const metadata: Metadata = {
  title: 'Doctor Shift Management | PulseCare',
  description: 'Manage doctor shifts and slot allocations.',
};

export default function CreateSchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 space-y-6">
      
      {/* Dynamic Glassmorphism Header (Full Width Container) */}
      <div className="w-full mx-auto">
        <ScheduleHeader />
      </div>

      {/* Content Section (Centered & Grid Constraint) */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CreateScheduleForm />
          </div>
          <div className="lg:col-span-5 sticky top-6">
            <ScheduleHeroCard />
          </div>
        </div>
      </div>

    </div>
  );
}