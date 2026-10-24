import { NextRequest, NextResponse } from "next/server";
 

const API_BASE_URL = "http://localhost:8080/api/v1/auth";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=missing_token", request.url));
  }

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!backendResponse.ok) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));

  } catch (error) {
    return NextResponse.redirect(new URL("/login?error=server_error", request.url));
  }
}