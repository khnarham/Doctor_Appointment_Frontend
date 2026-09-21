export type DoctorStatus = 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Doctor {
  id: string;
  userID: string;
  specializationID: string;
  licenseNumber: string;
  consultationFee: number;
  status: DoctorStatus;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  // Extended details for presentation layer
  fullName?: string;
  specializationName?: string;
  avatarUrl?: string;
}

export interface Slot {
  scheduleID: string;
  startTime: string; // e.g., "09:00"
  endTime: string;   // e.g., "09:30"
  isBooked: boolean;
}

export interface CreateAppointmentPayload {
  doctorID: string;
  scheduleID: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
}