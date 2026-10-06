import type {
  ResolveComponentFunction,
  ResolveComponentResult,
} from "@uniformdev/next-app-router";
import type { ComponentProps } from "@uniformdev/next-app-router/component";

import HeroSection from "./HeroSection";
import Page from "./Page";

const componentMap: Record<string, ResolveComponentResult["component"]> = {
  page: Page,
  heroSection: HeroSection,
};

const NotFoundComponent = ({ type }: ComponentProps) => (
  <div>
    Component &quot;{type}&quot; couldn&apos;t be resolved as it is not mapped
    in the resolveComponent function yet.
  </div>
);

export const resolveComponent: ResolveComponentFunction = ({ component }) => ({
  component: componentMap[component.type] ?? NotFoundComponent,
});
