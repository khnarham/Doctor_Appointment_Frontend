"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  Menu,
  X,
  Phone,
  Clock,
  LogIn,
  UserPlus,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/axios";

interface NavLink {
  name: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "Specialties", href: "#specialties" },
  { name: "Our Doctors", href: "#doctors" },
  { name: "How It Works", href: "#process" },
  { name: "Clinic Hours", href: "#hours" },
];

export function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [activeSection, setActiveSection] = useState<string>("Home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-300/80 shadow-xs"
          : "bg-zinc-50/90 backdrop-blur-xs border-b border-zinc-300/30"
      }`}
    >
      {/* Top Clinic Info Bar */}
      <div className="hidden sm:block border-b border-zinc-200/60 bg-emerald-50/50 text-xs text-zinc-600 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Clinic Open Today (8:00 AM - 10:00 PM)
            </span>
            <span className="text-zinc-300">|</span>
            <span className="flex items-center gap-1 text-zinc-600">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Walk-ins Welcome
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
            <Phone className="w-3.5 h-3.5" /> Emergency: +92 41 111 222 333
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-700 transition-all duration-200">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-zinc-900 leading-tight">
              Aria Health
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 tracking-wider uppercase">
              Primary Care Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center bg-zinc-100/90 backdrop-blur-md p-1.5 rounded-full border border-zinc-200/80 shadow-xs">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.name)}
                className={`relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-emerald-950"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/50"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-white rounded-full shadow-xs border border-zinc-200/60 -z-10 transition-all duration-300 ease-in-out" />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Auth Area */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2" ref={dropdownRef}>
              {/* Profile Avatar Trigger Button */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-100 transition-colors border border-zinc-200/80 shadow-2xs"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2.5 border-b border-zinc-100 mb-1">
                      <p className="text-sm font-bold text-zinc-900 truncate">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-zinc-500 truncate">
                        {user.email || "No email available"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        Dashboard
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-zinc-500" />
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-zinc-100"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Standalone Logout Icon Button */}
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-zinc-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-200"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/Auth"
                className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50/60 font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-200"
              >
                <LogIn className="w-4 h-4 text-zinc-500" />
                Sign In
              </Link>

              <Link
                href="/Auth"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-4.5 py-2 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-4 shadow-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.name);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  activeSection === link.name
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-zinc-800 hover:bg-zinc-50"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {user ? (
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shadow-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-zinc-900 text-sm">
                    {user.name || "User"}
                  </span>
                  <span className="text-xs text-zinc-500">{user.email || ""}</span>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 text-zinc-800 font-semibold py-2.5 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-zinc-500" />
                My Profile
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 font-semibold py-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                Go to Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="w-full inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 font-semibold py-2.5 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
              <Link
                href="/Auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 border border-zinc-200 text-zinc-800 font-semibold py-2.5 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <LogIn className="w-4 h-4 text-zinc-500" />
                Sign In
              </Link>
              <Link
                href="/Auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold py-2.5 rounded-xl shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}