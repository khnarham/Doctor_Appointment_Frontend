export type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}