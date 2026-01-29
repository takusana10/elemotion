import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const { pathname } = request.nextUrl;

  // Detect mobile devices using User-Agent
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);

  // Mobile device accessing root → redirect to /sp
  if (isMobileDevice && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/sp';
    return NextResponse.redirect(url);
  }

  // Desktop accessing /sp → redirect to root (PC version)
  if (!isMobileDevice && pathname === '/sp') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to root and /sp paths only
export const config = {
  matcher: ['/', '/sp'],
};
