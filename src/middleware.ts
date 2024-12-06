import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req: request, secret });
  const url = request.nextUrl;

  // If user is authenticated and tries to access auth-related routes, redirect to home
  if (
    token &&
    (url.pathname === '/signup' || url.pathname === '/login' || url.pathname.startsWith('/verify-code'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is NOT authenticated and tries to access protected routes, redirect to login
  if (!token && url.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow requests to other paths to continue
  return NextResponse.next();
}

// Specify the paths for middleware
export const config = {
  matcher: ['/', '/login', '/signup', '/verify-code/:path*'],
};
