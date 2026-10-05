import { cookies, draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isAllowedReferrer } from "@uniformdev/canvas";

const UNIFORM_ORIGIN = process.env.UNIFORM_CLI_BASE_URL ?? "https://uniform.app";
const PLAYGROUND_PATH = "/playground";

// Query params Uniform sends that we do not pass on to the page we redirect to.
const DROPPED_PARAMS = ["secret", "path", "slug", "locale"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Uniform asks this question when you save the preview URL in the dashboard.
  if (searchParams.get("is_config_check") === "true") {
    return Response.json(
      { hasPlayground: true, isUsingCustomFullPathResolver: false },
      { headers: { "Access-Control-Allow-Origin": UNIFORM_ORIGIN } },
    );
  }

  const secret = process.env.UNIFORM_PREVIEW_SECRET;
  if (!secret || searchParams.get("secret") !== secret) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const id = searchParams.get("id");
  const path = searchParams.get("path") ?? searchParams.get("slug");
  const isPlayground =
    searchParams.get("is_incontext_editing_playground") === "true" ||
    (Boolean(id) && !path);

  const target = isPlayground ? PLAYGROUND_PATH : path;
  if (!target) {
    return new Response("Could not work out which page to preview", {
      status: 400,
    });
  }

  const redirectUrl = new URL(
    target.startsWith("/") ? target : `/${target}`,
    request.url,
  );
  if (redirectUrl.origin !== request.nextUrl.origin) {
    return new Response("Redirects must stay on this site", { status: 400 });
  }

  const draft = await draftMode();

  if (searchParams.get("disable")) {
    draft.disable();
    return NextResponse.redirect(redirectUrl, 307);
  }

  draft.enable();

  // Uniform shows the site in an iframe on a different domain, so the draft
  // cookie must be SameSite=None (and Secure) or the browser will not send it.
  const cookieStore = await cookies();
  const bypassCookie = cookieStore.get("__prerender_bypass");
  if (bypassCookie?.value) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: bypassCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  const fromUniform = isAllowedReferrer(
    request.headers.get("referer") ?? undefined,
  );

  for (const [name, value] of searchParams) {
    if (DROPPED_PARAMS.includes(name)) continue;
    if (name === "id" && !isPlayground) continue;
    if (name.startsWith("is_incontext_editing") && !fromUniform) continue;
    redirectUrl.searchParams.append(name, value);
  }

  return NextResponse.redirect(redirectUrl, 307);
}
