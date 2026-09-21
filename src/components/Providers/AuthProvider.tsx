"use client";

import { useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthUser } from "@/services/Service";

export function AuthStateHydrator({
  user,
  children,
}: {
  user: AuthUser | null;
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.setState({ user });
    initialized.current = true;
  }
  console.log("User",user);
  

  return <>{children}</>;
}