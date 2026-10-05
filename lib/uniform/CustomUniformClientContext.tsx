"use client";

import { useRouter } from "next/navigation";
import { enableContextDevTools, type ContextPlugin } from "@uniformdev/context";
import {
  createClientUniformContext,
  useInitUniformContext,
  useUniformContext,
  type ClientContextComponent,
} from "@uniformdev/next-app-router-client";
import { UniformToolbar } from "@uniformdev/toolbar-react";

export const CustomUniformClientContext: ClientContextComponent = ({
  manifest,
  disableDevTools,
  defaultConsent,
  compositionMetadata,
}) => {
  const router = useRouter();

  useInitUniformContext(() => {
    const plugins: ContextPlugin[] = [];

    if (!disableDevTools) {
      plugins.push(
        enableContextDevTools({
          onAfterMessageReceived: () => {
            router.refresh();
          },
        }),
      );
    }

    return createClientUniformContext({
      manifest,
      plugins,
      defaultConsent,
    });
  }, compositionMetadata);

  return <AppUniformToolbar />;
};

function AppUniformToolbar() {
  const { context } = useUniformContext();

  return (
    <UniformToolbar
      context={context}
      simulator
      enabled={process.env.NODE_ENV === "development"}
    />
  );
}
