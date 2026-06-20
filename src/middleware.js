import { NextResponse } from 'next/server';

const rateLimit = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

function isRateLimited(ip) {
  const now = Date.now();
  let entry = rateLimit.get(ip);

  if (!entry || now - entry.start > WINDOW_MS) {
    rateLimit.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/static/')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }

  const skipPatterns = [
    '/_next/static/',
    '/_next/image/',
    '/favicon.ico',
    '/api/',
    '/watch/',
  ];

  if (skipPatterns.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.ip || 'unknown';
  if (isRateLimited(ip)) {
    return new NextResponse(JSON.stringify({ error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|watch/).*)'],
};
