import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protect all dashboard routes
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !isLoggedIn) {
    // If not logged in and trying to access dashboard, redirect to home/login
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't run middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
