import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const middleware = withAuth(
  function middleware(req) {
    // Add security headers
    const requestHeaders = new Headers(req.headers);

    // Prevent MIME type sniffing
    requestHeaders.set("X-Content-Type-Options", "nosniff");

    // Enable XSS protection
    requestHeaders.set("X-XSS-Protection", "1; mode=block");

    // Prevent clickjacking
    requestHeaders.set("X-Frame-Options", "DENY");

    // Content Security Policy
    requestHeaders.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );

    // Referrer Policy
    requestHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      // Support both JWT token and database session cookie.
      // When NextAuth is configured with `session.strategy = 'database'`, a
      // session cookie named `next-auth.session-token` (or the secure variant
      // `__Secure-next-auth.session-token`) is used. `token` may be undefined
      // in that case, so we also check cookies on the incoming request.
      authorized: ({ req, token }) => {
        if (token) return true;
        try {
          const cookies = req.cookies;
          // Check both possible cookie names (secure vs non-secure)
          const sessionCookie =
            cookies.get &&
            (cookies.get("next-auth.session-token") ||
              cookies.get("__Secure-next-auth.session-token"));
          if (sessionCookie) return true;
        } catch (e) {
          // ignore errors and deny by default
        }
        return false;
      },
    },
  }
);

// Protected routes that require authentication
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
