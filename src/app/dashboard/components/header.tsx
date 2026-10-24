'use client';

import { useState } from 'react';
import { 
  Bell, 
  Search, 
  UserPlus, 
  CalendarPlus, 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  CheckCheck,
  Clock,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '@/types/DashboardAuth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'New walk-in patient registered at desk', time: '5m ago', read: false },
  { id: '2', title: 'Dr. Usman updated schedule for tomorrow', time: '25m ago', read: false },
  { id: '3', title: 'Emergency slot booked by Receptionist', time: '1h ago', read: true }
];

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  onMobileMenuToggle?: () => void;
  onPrimaryAction?: () => void;
}

export function DashboardHeader({
  userName = "Dr. Arham Khan",
  userRole = "DOCTOR",
  onMobileMenuToggle,
  onPrimaryAction
}: DashboardHeaderProps) {
      const router = useRouter();


  const [activeSection, setActiveSection] = useState<string>("Home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };


  const handleLogout = async () => {

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });
  } catch (err) {
    console.error("Logout request error:", err);
  } finally {
    useAuthStore.setState({ user: null });
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/Auth");
  }
};



  // Dynamic Button Configuration based on User Role
  const renderRoleActionButton = () => {
      const handleLogout = async () => {
    const router = useRouter();

  const [activeSection, setActiveSection] = useState<string>("Home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });
  } catch (err) {
    console.error("Logout request error:", err);
  } finally {
    useAuthStore.setState({ user: null });
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push("/Auth");
  }
};

    switch (userRole) {
      case 'ADMIN':
        return (
          <button
            onClick={onPrimaryAction}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-sm shadow-teal-600/20 transition-all duration-150"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Receptionist</span>
          </button>
        );

      case 'DOCTOR':
        return (
          <button
            onClick={onPrimaryAction}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-sm shadow-teal-600/20 transition-all duration-150"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>Add New Schedule</span>
          </button>
        );

      case 'RECEPTIONIST':
        return (
          <button
            onClick={onPrimaryAction}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-sm shadow-teal-600/20 transition-all duration-150"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Patient</span>
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <header className="h-16 lg:h-20 border-b border-[var(--border-light)] bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      
      {/* 1. MOBILE HAMBURGER BUTTON & SEARCH */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-[var(--border-light)] transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-[220px] sm:max-w-xs md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, token no or record..."
            className="w-full pl-10 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-slate-50 border border-[var(--border-light)] rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      {/* 2. DYNAMIC ACTION BUTTON & NOTIFICATIONS */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Dynamic Role Action Button */}
        {renderRoleActionButton()}

        <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

        {/* NOTIFICATIONS DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={cn(
              "relative p-2 sm:p-2.5 rounded-xl border transition-all",
              showNotifications 
                ? "bg-teal-50 border-teal-200 text-teal-700" 
                : "bg-slate-50 border-[var(--border-light)] text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4.5 w-4.5 sm:h-5 sm:w-5 bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-96 bg-white border border-[var(--border-light)] rounded-2xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[11px] font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Read all
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.map((item) => (
                  <div key={item.id} className={cn("p-3 hover:bg-slate-50 flex gap-2.5 items-start", !item.read && "bg-teal-50/40")}>
                    <div className={cn("h-2 w-2 rounded-full mt-1.5 shrink-0", !item.read ? "bg-teal-500" : "bg-transparent")} />
                    <div className="flex-1">
                      <p className="text-xs leading-snug text-slate-800">{item.title}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-[var(--border-light)] transition-all"
          >
            <div className="relative">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm shadow-teal-500/20">
                {userName.charAt(0)}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{userName}</p>
              <p className="text-[10px] font-medium text-slate-500 capitalize">{userRole.toLowerCase()}</p>
            </div>

            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 sm:w-56 bg-white border border-[var(--border-light)] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{userName}</p>
                <p className="text-[10px] text-slate-500">CareClinic Staff</p>
              </div>

              <button className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                Profile Settings
              </button>
              <button className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <Settings className="h-4 w-4 text-slate-400" />
                Clinic Config
              </button>
              <button onClick={handleLogout} className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1">
                <LogOut className="h-4 w-4 text-rose-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}