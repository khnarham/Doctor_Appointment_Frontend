import React from 'react';

export const AppointmentListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-100 border border-slate-200 h-52 rounded-3xl p-6" />
      ))}
    </div>
  );
};