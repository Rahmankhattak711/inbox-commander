import { NextRequest, NextResponse } from "next/server";

/**
 * Route groups:
 *  - LANDING:   always public (the "/" landing page)
 *  - AUTH_ONLY: public pages that redirect logged-in users away (login, signup)
 *  - PROTECTED: require an active session — everything else
 */
const LANDING_ROUTE = "/";
const AUTH_ONLY_ROUTES = new Set(["/login", "/signup"]);
const AUTH_API_PREFIX = "/api/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow auth API routes through untouched
  if (pathname.startsWith(AUTH_API_PREFIX)) {
    return NextResponse.next();
  }

  // Read the session token from cookies (better-auth default cookie name)
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isLanding = pathname === LANDING_ROUTE;
  const isAuthOnly = AUTH_ONLY_ROUTES.has(pathname);
  const isPublic = isLanding || isAuthOnly;
  const hasSession = Boolean(sessionToken);

  // Landing page is always accessible — no redirect
  if (isLanding) {
    return NextResponse.next();
  }

  // Unauthenticated user hitting a protected route → redirect to /login
  if (!hasSession && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user on /login or /signup → send to dashboard
  if (hasSession && isAuthOnly) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Match every route EXCEPT:
   *  - Next.js internals (_next/static, _next/image)
   *  - Static files (favicon, images, fonts, etc.)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)).*)",
  ],
};
