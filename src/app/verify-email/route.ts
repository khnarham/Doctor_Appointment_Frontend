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

    // 2. Redirect response taiyar karo jo user ko dashboard ya home par le jaye
    const redirectResponse = NextResponse.redirect(new URL("/", baseUrl));

    // 3. Backend ke Set-Cookie headers ko uthao aur browser ko forward kar do
    const setCookieHeaders = backendRes.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

      setCookieHeaders.forEach((cookieStr) => {
        let modifiedCookie = cookieStr;

        if (isProduction) {
          // Ensure karo ke cross-domain (Vercel -> Railway) ke liye SameSite=None aur Secure laazmi ho
          if (!modifiedCookie.toLowerCase().includes("samesite=")) {
            modifiedCookie += "; SameSite=None";
          } else {
            modifiedCookie = modifiedCookie.replace(/samesite=[a-z]+/i, "SameSite=None");
          }

          if (!modifiedCookie.toLowerCase().includes("secure")) {
            modifiedCookie += "; Secure";
          }
        }

        // Browser ko backend wali original cookies pass kar do
        redirectResponse.headers.append("Set-Cookie", modifiedCookie);
      });
    }

    return redirectResponse;

  } catch (error) {
    console.error("Verification Route Error:", error);
    return NextResponse.redirect(new URL("/Auth?error=server_error", baseUrl));
  }
}