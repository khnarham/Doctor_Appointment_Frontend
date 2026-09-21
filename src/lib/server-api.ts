import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const activeRefreshes = new Map<string, Promise<string | null>>();

async function refreshLockDeduplicator(refreshToken: string): Promise<string | null> {
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

      // 1. First Priority: Header extraction from Gin c.SetCookie
      const setCookieHeaders = refreshResponse.headers.getSetCookie();
      if (setCookieHeaders && setCookieHeaders.length > 0) {
        return setCookieHeaders.map((c) => c.split(";")[0]).join("; ");
      }

      // 2. Fallback: Parse JSON body if headers are stripped by proxy/CORS
      const json = await refreshResponse.json().catch(() => null);
      if (json?.data?.access_token) {
        return `access_token=${json.data.access_token}; refresh_token=${json.data.refresh_token || refreshToken}`;
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

export async function serverFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = await cookies();
  const currentCookies = cookieStore.toString();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Cookie: currentCookies,
    ...options.headers,
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options.cache || "no-store",
  });

  if (response.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      throw new Error("UNAUTHORIZED_NO_REFRESH_TOKEN");
    }

    const updatedCookieHeader = await refreshLockDeduplicator(refreshToken);

    if (!updatedCookieHeader) {
      throw new Error("SESSION_EXPIRED");
    }

    // Attempting Next.js store sync
    updatedCookieHeader.split("; ").forEach((pair) => {
      const [key, val] = pair.split("=");
      if (key && val) {
        try {
          cookieStore.set(key.trim(), val.trim(), { path: "/", httpOnly: true });
        } catch {
          // Server Component render limits are ignored gracefully
        }
      }
    });

    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        Cookie: updatedCookieHeader,
      },
      cache: options.cache || "no-store",
    });
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = data?.message || response.statusText || `HTTP ${response.status}`;
    throw new Error(`API_ERROR: ${errorMessage}`);
  }

  return data as T;
}