import {
  createUniformStaticParams,
  resolveRouteFromCode,
  UniformComposition,
  type UniformPageParameters,
} from "@uniformdev/next-app-router";

import { resolveComponent } from "@/app/components/resolveComponent";
import { CustomUniformClientContext } from "@/lib/uniform/CustomUniformClientContext";
import { defaultLocale } from "@/lib/uniform/locale";

export const generateStaticParams = async () => {
  return createUniformStaticParams({
    paths: [`/${defaultLocale}`],
  });
};

export default async function UniformPage(props: UniformPageParameters) {
  const { code } = await props.params;

  return (
    <UniformComposition
      code={code}
      resolveRoute={resolveRouteFromCode}
      resolveComponent={resolveComponent}
      clientContextComponent={CustomUniformClientContext}
    />
  );
}
