import { api } from "@/lib/axios";
import { SignUpInput, SignInInput } from "@/lib/validations/auth";

export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
}

export interface BackendResponse<T = any> {
  message: string;
  data?: T;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
}

export class AuthService {
  static async signUp(data: SignUpInput): Promise<AuthResponse> {
    try {
      const res = await api.post<BackendResponse<AuthUser>>("/auth/register", data);

      const resData = res.data;

      return {
        success: true,
        message: resData.message,
        user: resData.data
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Something went wrong during sign up";
      throw new Error(errorMessage);
    }
  }

  static async signIn(data: SignInInput): Promise<AuthResponse> {
    try {
      const res = await api.post<BackendResponse<AuthUser>>("/auth/login", data);

      const resData = res.data;

      return {
        success: true,
        message: resData.message,
        user: resData.data,
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Invalid credentials";
      throw new Error(errorMessage);
    }
  }
}