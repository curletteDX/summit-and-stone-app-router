import { NextResponse, type NextRequest } from "next/server";
import { uniformMiddleware } from "@uniformdev/next-app-router/middleware";

import { defaultLocale, locales } from "@/lib/uniform/locale";

// The Uniform project map has a /:locale node (for example /en-US), so every
// Uniform page lives under a locale. Uniform's own playground URL is the one
// path that is not localized.
const playgroundPath = "/uniform/playground";

const hasLocale = (pathname: string) => {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return firstSegment !== undefined && locales.includes(firstSegment);
};

const handleUniform = uniformMiddleware({
  // The SDK's default playground rewrite is /uniform/playground/<code>.
  // This app keeps its playground at /playground/[code] instead. Uniform still
  // opens /uniform/playground; only the internal rewrite target changes.
  rewriteDestinationPath: async ({ code, source }) =>
    source === "playground" ? `/playground/${code}` : "",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // No locale in the URL: redirect, so "/" becomes "/en-US" and "/about"
  // becomes "/en-US/about". The query string is kept.
  if (!pathname.startsWith(playgroundPath) && !hasLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return handleUniform(request);
}

// Required for the middleware to work correctly for preview in Next.js 16.
// "static" is our addition: it keeps the hardcoded reference site out of Uniform.
export const config = {
  matcher: [
    "/((?!api|static(?:/|$)|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
  runtime: "experimental-edge",
};
