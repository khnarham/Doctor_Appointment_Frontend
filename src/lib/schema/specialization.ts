import { z } from "zod";

export const specializationSchema = z.object({
  name: z
    .string()
    .min(2, "Specialization name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(300, "Description cannot exceed 300 characters")
    .trim(),
});

export type SpecializationFormValues = z.infer<typeof specializationSchema>;

export interface Specialization {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}