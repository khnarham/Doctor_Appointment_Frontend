import { z } from 'zod';

const time24Regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const createScheduleSchema = z
  .object({
    day: z.enum(WEEKDAYS, { required_error: 'Please select a day' }),
    start_time: z
      .string()
      .regex(time24Regex, 'Must be in 24-hour HH:mm format (e.g., 09:00, 14:30)'),
    end_time: z
      .string()
      .regex(time24Regex, 'Must be in 24-hour HH:mm format (e.g., 17:00, 22:00)'),
    slot_duration: z.coerce
      .number()
      .min(5, 'Slot duration must be at least 5 minutes')
      .max(180, 'Slot duration cannot exceed 180 minutes'),
  })
  .refine(
    (data) => {
      if (!data.start_time || !data.end_time) return true;
      const [startH, startM] = data.start_time.split(':').map(Number);
      const [endH, endM] = data.end_time.split(':').map(Number);
      return endH * 60 + endM > startH * 60 + startM;
    },
    {
      message: 'End time must be after start time',
      path: ['end_time'],
    }
  );

export type CreateScheduleFormValues = z.infer<typeof createScheduleSchema>;

export interface CreateScheduleRequest {
  doctor_id: string;
  day: string;
  start_time: string;
  end_time: string;
  slot_duration: number;
}