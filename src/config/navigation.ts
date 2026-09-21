import { UserRole } from '@/types/DashboardAuth';

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: 'teal' | 'slate' | 'amber';
}

export interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}

export const ROLE_NAVIGATION: Record<UserRole, NavGroup[]> = {
  ADMIN: [
    {
      groupTitle: "Analytics & Overview",
      items: [
        { title: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
        { title: "Analytics & Reports", href: "/dashboard/admin/analytics", icon: "TrendingUp" },
      ]
    },
    {
      groupTitle: "Management",
      items: [
        { title: "Doctors & Staff", href: "/dashboard/admin/doctors", icon: "UserCheck", badge: "12 Staff" },
        { title: "Clinic Services", href: "/dashboard/admin/services", icon: "Stethoscope" },
        { title: "System Settings", href: "/dashboard/admin/settings", icon: "Sliders" },
      ]
    }
  ],

  DOCTOR: [
    {
      groupTitle: "Clinical Care",
      items: [
        { title: "Today's Queue", href: "/dashboard/doctor", icon: "CalendarCheck2", badge: "8 Today", badgeVariant: "teal" },
        { title: "Patient Records", href: "/dashboard/doctor/patients", icon: "Users" },
        { title: "Prescriptions & Rx", href: "/dashboard/doctor/prescriptions", icon: "FileText" },
      ]
    },
    {
      groupTitle: "Personal",
      items: [
        { title: "Slot Consultation Times", href: "/dashboard/doctor/schedule", icon: "Clock" },
        { title: "Medical Notes", href: "/dashboard/doctor/notes", icon: "ClipboardList" },
      ]
    }
  ],

  RECEPTIONIST: [
    {
      groupTitle: "Front Desk Operations",
      items: [
        { title: "Reception Desk", href: "/dashboard/receptionist", icon: "Monitor" },
        { title: "Book Appointment", href: "/dashboard/receptionist/new-booking", icon: "CalendarPlus", badge: "New", badgeVariant: "amber" },
        { title: "Patient Registration", href: "/dashboard/receptionist/register-patient", icon: "UserPlus" },
      ]
    },
    {
      groupTitle: "Clinic Logistics",
      items: [
        { title: "Doctor Availability", href: "/dashboard/receptionist/doctor-status", icon: "Activity" },
        { title: "Billing & Receipts", href: "/dashboard/receptionist/billing", icon: "Receipt" },
      ]
    }
  ]
};