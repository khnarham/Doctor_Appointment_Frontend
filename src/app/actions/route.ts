'use server';

import { SignInInput } from "@/lib/validations/auth";
import { AuthService } from "@/services/Service";

export async function loginAction(data: SignInInput) {
  return await AuthService.signIn(data);
}