import {
  resolvePlaygroundRoute,
  UniformPlayground,
  type PlaygroundParameters,
} from "@uniformdev/next-app-router";

import { resolveComponent } from "@/app/components/resolveComponent";

export default async function PlaygroundPage({ params }: PlaygroundParameters) {
  const { code } = await params;

  return (
    <UniformPlayground
      code={code}
      resolveRoute={resolvePlaygroundRoute}
      resolveComponent={resolveComponent}
    />
  );
}
