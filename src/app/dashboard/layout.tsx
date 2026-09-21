'use client';

import { useState } from 'react';
import { AppSidebar } from './components/app-sidebar';
import { DashboardHeader } from './components/header';
import QueryProvider from '@/components/Providers/Query-provider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = {
    name: "Dr. Arham Khan",
    email: "arham@careclinic.com"
  };

  return (
    <QueryProvider>
  <div className="flex min-h-screen bg-[var(--bg-page)]">
      <AppSidebar
        role="DOCTOR" 
        user={currentUser}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          userName={currentUser.name} 
          userRole="DOCTOR" 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </QueryProvider>

  );
}