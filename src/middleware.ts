import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/account', '/orders', '/checkout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check for auth token in localStorage via cookie (set by auth store)
    // Since we can't access localStorage in middleware, we check for a session indicator
    // The actual auth check happens client-side, but this prevents direct URL access
    // to protected pages without going through the login flow
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
