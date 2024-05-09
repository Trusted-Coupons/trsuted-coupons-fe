import { NextRequest, NextResponse } from 'next/server';

const localeRegex = /^[a-z]{2}-[A-Z]{2}$/; // Regular expression pattern to match locales in the format 'xx-XX'
const defaultLocale = 'en-US'; // Default locale

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = localeRegex.test(pathname.split('/')[1]);

  if (pathnameHasLocale) {
    return;
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
};
