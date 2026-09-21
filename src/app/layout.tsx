import { cookies } from "next/headers";
import { AuthStateHydrator } from "@/components/Providers/AuthProvider";
import { api } from "@/lib/axios";
import { AuthUser, BackendResponse } from "@/services/Service";
import { serverFetch } from "@/lib/server-api";
import { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/Providers/Query-provider";

export const metadata: Metadata = {
  title: "HealthCare Clinic | Expert Doctors & Instant Booking",
  description: "Book appointments with top medical specialists at our primary care clinic.",
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
async function getInitialUser(): Promise<AuthUser | null>{
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const token = cookieStore.get("refresh_token")?.value;

  console.log(cookieHeader);
  
  if (!token) {
    return null
  }
  try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
         Cookie: cookieStore.toString(), 
         },
        cache: "no-store", 
  });
  const res = await response.json()
    return res.data ?? null
  } catch(error) {
    console.error("[SSR Auth Error]: Failed to hydrate initial user:", error);
    return null
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getInitialUser();

  return (
    <html lang="en">
      <body>
        <QueryProvider>
        <AuthStateHydrator user={user}>{children}</AuthStateHydrator>
        </QueryProvider>
      </body>
    </html>
  );
}