'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROLE_NAVIGATION, NavItem } from '@/config/navigation';
import { UserRole } from '@/types/DashboardAuth';
import {
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  Stethoscope,
  Sliders,
  CalendarCheck2,
  Users,
  FileText,
  Clock,
  ClipboardList,
  Monitor,
  CalendarPlus,
  UserPlus,
  Activity,
  Receipt,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { useState } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  Stethoscope,
  Sliders,
  CalendarCheck2,
  Users,
  FileText,
  Clock,
  ClipboardList,
  Monitor,
  CalendarPlus,
  UserPlus,
  Activity,
  Receipt,
};

interface AppSidebarProps {
  role: string;
  user?: { name: string; email: string };
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}



export function AppSidebar({ role, user, isMobileOpen = false, onMobileClose }: AppSidebarProps) {
  const pathname = usePathname();
  const navGroups = ROLE_NAVIGATION[role] || [];

  const sidebarContent = (
    <div className="w-72 bg-white min-h-full flex flex-col justify-between border-r border-[var(--border-light)] select-none">
      
      {/* 1. BRAND HEADER */}
      <div>
        <div className="h-16 lg:h-20 px-6 border-b border-[var(--border-light)] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-md shadow-teal-500/20">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base lg:text-lg text-slate-900 leading-none block">CareClinic</span>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5 block">Health Management</span>
            </div>
          </Link>

          {/* Close button for Mobile Drawer */}
          <button 
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2. NAVIGATION GROUPS */}
        <div className="p-4 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.groupTitle && (
                <div className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                  {group.groupTitle}
                </div>
              )}

              {group.items.map((item: NavItem) => {
                const IconComponent = ICON_MAP[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose} // Auto close drawer on route click in mobile
                    className={cn(
                      "group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-teal-50 text-teal-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-500 rounded-r-full" />
                    )}

                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={cn("h-4.5 w-4.5", isActive ? "text-teal-600" : "text-slate-600")}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge ? (
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md border bg-teal-100 text-teal-700 border-teal-200">
                        {item.badge}
                      </span>
                    ) : (
                      isActive && <ChevronRight className="h-4 w-4 text-teal-600 opacity-80" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* 3. USER PROFILE FOOTER */}
      <div className="p-4 border-t border-[var(--border-light)] bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[var(--border-light)] shadow-sm">
          <div className="flex items-center gap-2.5 truncate">
            <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center shrink-0 border border-teal-200 text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 truncate">{user?.name || "Dr. Arham"}</p>
              <p className="text-[10px] text-slate-600 truncate">{user?.email || "arham@clinic.com"}</p>
            </div>
          </div>
          <button title="Sign Out" className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (Static on screens lg and above) */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={onMobileClose} 
          />
          {/* Drawer Wrapper */}
          <div className="fixed inset-y-0 left-0 z-50 flex shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}