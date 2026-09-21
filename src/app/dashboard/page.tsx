'use client';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'Waiting' | 'In Consultation' | 'Completed';
}


export default function DoctorDashboard() {
 

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Doctor Console</h2>
      <div className="grid gap-4">

      </div>
    </div>
  );
}