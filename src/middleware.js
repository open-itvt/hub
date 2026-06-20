import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const skipPatterns = [
    '/_next/static/',
    '/_next/image/',
    '/favicon.ico',
    '/api/',
    '/static/',
    '/watch/',
  ];

  if (skipPatterns.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const forceRedirect = process.env.FORCE_REDIRECT_SET === '1';

  if (!forceRedirect) {
    const deadline = new Date('2026-06-20T20:00:00+02:00');
    if (Date.now() < deadline.getTime()) {
      return NextResponse.next();
    }
  }

  const destination = new URL('https://vod.itvt.xyz');
  destination.searchParams.set('source', 'hub');
  destination.searchParams.set('migrate', '1');

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico).*)'],
};
