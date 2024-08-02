import { NextRequest, NextResponse } from 'next/server';

const localeRegex = /^[a-z]{2}-[A-Z]{2}$/;
const defaultLocale = 'en-US';
const excludeFiles = ['/googlecedb3442f7706abd.html', '/lang.html', '/sitemap.xml', '/BingSiteAuth.xml'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for the root path
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/lang.html', request.url));
  }

  // Check if the pathname should be excluded from locale redirection
  if (excludeFiles.some(file => pathname.startsWith(file))) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = localeRegex.test(pathname.split('/')[1]);
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the pathname with the default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
