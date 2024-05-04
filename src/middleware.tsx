import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const supportedLanguages: any = {
  en: "en-US",
  es: "es-ES",
};

let headers = { "accept-language": "nl-NL,nl;q=0.5" }; // Example request headers
let languages = new Negotiator({ headers }).languages(); // Extract languages from headers
let locales = ["en-US", "nl-NL", "nl"]; // Supported locales
let defaultLocale = "en-US"; // Default locale

function getLocale(request: NextRequest) {
  const preferredLocale = match(languages, locales, defaultLocale); // Match preferred locale
  return preferredLocale || defaultLocale; // Fallback to default locale if no match is found
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
