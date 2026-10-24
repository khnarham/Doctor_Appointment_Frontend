export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}

export const ROLE_NAVIGATION: Record<string, NavGroup[]> = {
  // ADMIN ROUTES
  ADMIN: [
    {
      groupTitle: "Main Menu",
      items: [
        { title: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
        { title: "Specialization", href: "/dashboard/admin/specialization", icon: "Sliders" },
      ],
    },
    {
      groupTitle: "User Management",
      items: [
        { title: "Invite Doctor", href: "/dashboard/admin/doctor-invite", icon: "UserPlus" },
        { title: "Invite Receptionist", href: "/dashboard/admin/receptionist/invite", icon: "UserCheck" },
      ],
    },
  ],

  // DOCTOR ROUTES
  DOCTOR: [
    {
      groupTitle: "Overview",
      items: [
        { title: "Dashboard", href: "/dashboard/doctor", icon: "LayoutDashboard" },
        { title: "Appointments", href: "/dashboard/doctor/appointments", icon: "CalendarCheck2" },
      ],
    },
    {
      groupTitle: "Schedules",
      items: [
        { title: "My Schedules", href: "/dashboard/doctor/schedules", icon: "Clock" },
        { title: "Create Schedule", href: "/dashboard/doctor/schedules/create", icon: "CalendarPlus" },
      ],
    },
  ],

  // RECEPTIONIST ROUTES
  RECEPTIONIST: [
    {
      groupTitle: "Main Menu",
      items: [
        { title: "Dashboard", href: "/dashboard/receptionist", icon: "LayoutDashboard" },
      ],
    },
    {
      groupTitle: "Walk-In Services",
      items: [
        { title: "Register Walk-In", href: "/dashboard/receptionist/register-walk-in", icon: "UserPlus" },
        { title: "Book Walk-In", href: "/dashboard/receptionist/register-walk-in/book-appointment", icon: "CalendarPlus" },
      ],
    },
  ],
};