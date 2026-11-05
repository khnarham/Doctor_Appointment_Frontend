import { NextRequest, NextResponse } from "next/server";

const BACKEND_URI = process.env.BACKEND_URI || "http://localhost:8080";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let token = searchParams.get("token");

  if (!token) {
    searchParams.forEach((value, key) => {
      if (key.startsWith("token")) {
        token = key.split("=")[1] || value;
      }
    });
  }

  const baseUrl = request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/Auth?error=missing_token", baseUrl));
  }

  try {
    // 1. Backend par email verification request bhejo
    const backendRes = await fetch(
      `${BACKEND_URI}/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        redirect: "manual",
      }
    );

    if (!backendRes.ok && backendRes.status !== 302 && backendRes.status !== 301) {
      return NextResponse.redirect(new URL("/Auth?error=invalid_token", baseUrl));
    }

    // 2. Seedha user ko home/dashboard par redirect kar do (Baghair kisi cookie manipulation ke)
    return NextResponse.redirect(new URL("/", baseUrl));

  } catch (error) {
    console.error("Verification Route Error:", error);
    return NextResponse.redirect(new URL("/Auth?error=server_error", baseUrl));
  }
}