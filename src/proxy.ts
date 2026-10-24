import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const activeRefreshes = new Map<string, Promise<string[] | null>>();

type Role = "PATIENT" | "DOCTOR" | "ADMIN" | "RECEPTIONIST";

const ROLE_ROUTES: Record<Role, string[]> = {
  PATIENT: ["/doctors", "/patient/appointments"],

  DOCTOR: [
    "/doctors",
    "/appointments",
    "/profiles",
    "/dashboard",
    "/dashboard/doctor",
  ],

  ADMIN: [
    "/dashboard",
    "/dashboard/admin",
  ],

  RECEPTIONIST: [
    "/dashboard",
    "/dashboard/receptionist",
    "/dashboard/receptionist/register-walk-in",
    "/dashboard/receptionist/register-walk-in/book-appointment",
  ],
};

function isAllowedRoute(pathname: string, role: Role): boolean {
  if (pathname === "/dashboard") {
    return role === "DOCTOR" ||
      role === "ADMIN" ||
      role === "RECEPTIONIST";
  }

  // Wildcard prefix check for deep sub-routes & query params safety
  if (role === "RECEPTIONIST" && pathname.startsWith("/dashboard/receptionist")) {
    return true;
  }
  if (role === "ADMIN" && pathname.startsWith("/dashboard/admin")) {
    return true;
  }
  if (role === "DOCTOR" && (pathname.startsWith("/dashboard/doctor") || pathname.startsWith("/doctors") || pathname.startsWith("/appointments") || pathname.startsWith("/profiles"))) {
    return true;
  }

  const allowedRoutes = ROLE_ROUTES[role];

  return allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function getRoleFromToken(token: string): Role | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    
    // Fix missing base64 padding to prevent atob crashes in Edge runtime
    while (base64.length % 4) {
      base64 += "=";
    }

    const decoded = atob(base64);
    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes));

    const rawRole = claims.role ?? claims.Role ?? claims.user_role;
    const role = typeof rawRole === "string" ? rawRole.toUpperCase() : null;

    if (
      role === "PATIENT" ||
      role === "DOCTOR" ||
      role === "ADMIN" ||
      role === "RECEPTIONIST"
    ) {
      return role as Role;
    }

    return null;
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
}

function redirectToAuth(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/Auth";
  url.search = "";

  return NextResponse.redirect(url);
}

async function refreshLockDeduplicator(
  refreshToken: string
): Promise<string[] | null> {
  if (activeRefreshes.has(refreshToken)) {
    return activeRefreshes.get(refreshToken)!;
  }

  const refreshPromise = (async () => {
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refresh_token=${refreshToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        cache: "no-store",
      });

      if (!refreshResponse.ok) return null;

      const setCookies = refreshResponse.headers.getSetCookie();

      if (setCookies && setCookies.length > 0) {
        return setCookies;
      }

      const json = await refreshResponse.json().catch(() => null);

      if (json?.data?.access_token) {
        const newAccess = `access_token=${json.data.access_token}; Path=/; HttpOnly; SameSite=Lax`;
        const newRefresh = `refresh_token=${json.data.refresh_token || refreshToken}; Path=/; HttpOnly; SameSite=Lax`;

        return [newAccess, newRefresh];
      }

      return null;
    } catch {
      return null;
    } finally {
      activeRefreshes.delete(refreshToken);
    }
  })();

  activeRefreshes.set(refreshToken, refreshPromise);
  return refreshPromise;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  let token = accessToken;
  const role = token ? getRoleFromToken(token) : null;

  if (pathname === "/Auth" || pathname.startsWith("/Auth/")) {
    if (token) {
      const url = request.nextUrl.clone();
      switch (role) {
        case "PATIENT":
          url.pathname = "/doctors";
          break;
        case "DOCTOR":
          url.pathname = "/dashboard/doctor";
          break;
        case "ADMIN":
          url.pathname = "/dashboard/admin";
          break;
        case "RECEPTIONIST":
          url.pathname = "/dashboard/receptionist/register-walk-in";
          break;
        default:
          url.pathname = "/doctors";
          break;
      }
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  const blockedRoutes = [
    "/doctor-registration",
    "/accept-invite/receptionist-register",
  ];

  if (
    blockedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    const isLoggedIn = !!token;
    const isPatient = role === "PATIENT";
    const isTokenShort = token ? token.length < 20 : false;

    if ((isLoggedIn || isPatient) && isTokenShort) {
      const url = request.nextUrl.clone();
      url.pathname = "/Auth";
      url.search = "";

      return NextResponse.redirect(url);
    }
  }

  if (!token && refreshToken) {
    const newSetCookieHeaders =
      await refreshLockDeduplicator(refreshToken);

    if (newSetCookieHeaders) {
      const cookiePairs = newSetCookieHeaders.map((c) => c.split(";")[0]);
      const newCookieHeaderString = cookiePairs.join("; ");

      const requestHeaders = new Headers(request.headers);
      const existingCookieHeader = request.headers.get("cookie") || "";

      requestHeaders.set(
        "cookie",
        existingCookieHeader
          ? `${existingCookieHeader}; ${newCookieHeaderString}`
          : newCookieHeaderString
      );

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      newSetCookieHeaders.forEach((cookieStr) => {
        response.headers.append("Set-Cookie", cookieStr);
      });

      return response;
    }
  }

  const protectedRoutes = Object.values(ROLE_ROUTES).flat();
  const isRoleProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  ) || pathname.startsWith("/dashboard/receptionist");

  if (!isRoleProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectToAuth(request);
  }

  const userRole = getRoleFromToken(token);

  if (!userRole || !isAllowedRoute(pathname, userRole)) {
    const url = request.nextUrl.clone();

    switch (userRole) {
      case "PATIENT":
        url.pathname = "/doctors";
        break;
      case "DOCTOR":
        url.pathname = "/dashboard/doctor";
        break;
      case "ADMIN":
        url.pathname = "/dashboard/admin";
        break;
      case "RECEPTIONIST":
        url.pathname = "/dashboard/receptionist/register-walk-in";
        break;
      default:
        return redirectToAuth(request);
    }

    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};