import { uniformMiddleware } from "@uniformdev/next-app-router/middleware";

import { defaultLocale } from "@/lib/uniform/locale";

// The Uniform project map has a /:locale node (for example /en-US), so a
// request for "/" must be looked up as "/en-US". Paths that already start
// with the locale are left alone.
const withLocale = (pathname: string) => {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return firstSegment === defaultLocale ? pathname : `/${defaultLocale}${pathname}`;
};

export default uniformMiddleware({
  rewriteRequestPath: async ({ url }) => ({
    path: `${withLocale(url.pathname)}${url.search}`,
  }),
  // The SDK's default playground rewrite is /uniform/playground/<code>.
  // This app keeps its playground at /playground/[code] instead. Uniform still
  // opens /uniform/playground; only the internal rewrite target changes.
  rewriteDestinationPath: async ({ code, source }) =>
    source === "playground" ? `/playground/${code}` : "",
});

// Required for the middleware to work correctly for preview in Next.js 16.
// "static" is our addition: it keeps the hardcoded reference site out of Uniform.
export const config = {
  matcher: [
    "/((?!api|static(?:/|$)|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
  runtime: "experimental-edge",
};
