import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ACCESS_EXPIRY = parseInt(process.env.JWT_ACCESS_EXPIRY || "900", 10);
const REFRESH_EXPIRY = parseInt(process.env.JWT_REFRESH_EXPIRY || "604800", 10);
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
    return NextResponse.redirect(new URL("/login?error=missing_token", baseUrl));
  }

  try {
    const backendRes = await fetch(
      `${BACKEND_URI}/api/v1/auth/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!backendRes.ok) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", baseUrl));
    }

    const resData = await backendRes.json();
    const authData = resData?.data;

    const accessToken = authData?.accessToken || authData?.access_token;
    const refreshToken = authData?.refreshToken || authData?.refresh_token;

    if (accessToken && refreshToken) {
      const cookieStore = await cookies();
      const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
      
      // Cross-domain (Vercel + Railway) ke liye 'none' aur secure true hona lazmi hai
      const sameSiteValue = isProduction ? "none" : "lax";

      cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: sameSiteValue as "none" | "lax" | "strict",
        path: "/",
        maxAge: ACCESS_EXPIRY,
      });

      cookieStore.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: sameSiteValue as "none" | "lax" | "strict",
        path: "/",
        maxAge: REFRESH_EXPIRY,
      });

      if (authData?.role) {
        cookieStore.set("user_role", String(authData.role), {
          httpOnly: false,
          secure: isProduction,
          sameSite: sameSiteValue as "none" | "lax" | "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      return NextResponse.redirect(new URL("/", baseUrl));
    } else {
      return NextResponse.redirect(new URL("/login?error=invalid_response", baseUrl));
    }
  } catch (error) {
    console.error("Verification Route Error:", error);
    return NextResponse.redirect(new URL("/login?error=server_error", baseUrl));
  }
}