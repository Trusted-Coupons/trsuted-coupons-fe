import { NextRequest, NextResponse } from 'next/server';

const localeRegex = /^[a-z]{2}-[A-Z]{2}$/; // Regular expression pattern to match locales in the format 'xx-XX'
const defaultLocale = 'en-US'; // Default locale
const excludeFiles = ['/googlecedb3442f7706abd.html', '/lang.html']; // List of files to exclude from locale redirection

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname should be excluded
  if (excludeFiles.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = localeRegex.test(pathname.split('/')[1]);
  if (pathnameHasLocale) {
    return;
  }

  // Redirect to the pathname with the default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: '/((?!_next).*)' // Apply middleware to all paths except for those under _next
};
