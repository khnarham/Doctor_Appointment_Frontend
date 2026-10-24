import { z } from "zod";

// SIGN UP SCHEMA
export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^(?:\+92|0)?3\d{9}$/,
      "Enter a valid Pakistani phone number (e.g., 03001234567 or +923001234567)"
    ),

  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      // Calculate age
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age >= 18;
    }, "You must be at least 18 years old"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  gender: z.enum(["Male", "Female", "other"], {
    errorMap: (issue) => {
      if (
        issue.code === z.ZodIssueCode.invalid_enum_value ||
        issue.code === z.ZodIssueCode.invalid_type
      ) {
        return { message: "Please select a gender" };
      }
      return { message: "Invalid gender selection" };
    },
  }),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;