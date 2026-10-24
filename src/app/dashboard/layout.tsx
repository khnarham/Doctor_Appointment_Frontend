'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AppSidebar } from './components/app-sidebar';
import { DashboardHeader } from './components/header';
import QueryProvider from '@/components/Providers/Query-provider';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      router.push('/Auth');
      return;
    }

    const role = user.role?.toUpperCase();

    // 2. Patient ko home page par bhejo
    if (role === 'PATIENT') {
      router.push('/');
      return;
    }

    // 3. Agar user sirf exact /dashboard par aata hai, tabhi uske default page par redirect karo
    // Baaki sub-routes aur query params ko bilkul mat chhedo
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      if (role === 'RECEPTIONIST') {
        router.push('/dashboard/receptionist/register-walk-in');
      } else if (role === 'DOCTOR') {
        router.push('/dashboard/doctor');
      } else if (role === 'ADMIN') {
        router.push('/dashboard/admin');
      }
    }
  }, [user, pathname, router, isHydrated]);

  // Jab tak hydrate nahi hua ya user nahi hai, tab tak blank/null return karo taake false redirect na ho
  if (!isHydrated || !user || user.role?.toUpperCase() === 'PATIENT') {
    return null;
  }

  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-[var(--bg-page)]">
        <AppSidebar
          role={user?.role}
          user={user}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader 
            userName={user.name} 
            userRole={user.role} 
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