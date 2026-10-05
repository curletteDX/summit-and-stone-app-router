import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  RouteClient,
} from "@uniformdev/canvas";

import PageComposition from "@/app/components/PageComposition";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`;

  const { isEnabled: isDraft } = await draftMode();

  const routeClient = new RouteClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const route = await routeClient.getRoute({
    path,
    state: isDraft ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  if (route.type === "redirect") {
    redirect(route.redirect.targetUrl);
  }

  if (route.type !== "composition") {
    notFound();
  }

  return <PageComposition data={route.compositionApiResponse.composition} />;
}
