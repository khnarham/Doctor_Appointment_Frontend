import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const activeRefreshes = new Map<string, Promise<string[] | null>>();

async function refreshLockDeduplicator(refreshToken: string): Promise<string[] | null> {
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
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!accessToken && refreshToken) {
    const newSetCookieHeaders = await refreshLockDeduplicator(refreshToken);

    if (newSetCookieHeaders) {
      const cookiePairs = newSetCookieHeaders.map((c) => c.split(";")[0]);
      const newCookieHeaderString = cookiePairs.join("; ");

      const requestHeaders = new Headers(request.headers);
      const existingCookieHeader = request.headers.get("cookie") || "";
      
      requestHeaders.set("cookie", existingCookieHeader ? `${existingCookieHeader}; ${newCookieHeaderString}` : newCookieHeaderString);

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};