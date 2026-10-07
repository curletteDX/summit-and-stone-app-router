import type { LinkParamValue } from "@uniformdev/canvas";
import {
  UniformSlot,
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type CardGridColumns = "2" | "3" | "4";
type CardGridBackground = "plain" | "subtle" | "gradient";
type CardGridWidth = "narrow" | "default" | "wide";
type CardGridHeadingAlign = "center" | "left";

interface CardGridParameters {
  eyebrow: ComponentParameter<string>;
  heading: ComponentParameter<string>;
  subheading: ComponentParameter<string>;
  link: ComponentParameter<LinkParamValue>;
  linkText: ComponentParameter<string>;
  columns: ComponentParameter<CardGridColumns>;
  background: ComponentParameter<CardGridBackground>;
  containerWidth: ComponentParameter<CardGridWidth>;
  headingAlign: ComponentParameter<CardGridHeadingAlign>;
  showDivider: ComponentParameter<boolean>;
  sectionId: ComponentParameter<string>;
}

type CardGridSlots = "cards";

// Full class names are listed so Tailwind v4 can detect them at build time.
const COLUMN_CLASSES: Record<CardGridColumns, string> = {
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const BACKGROUND_CLASSES: Record<CardGridBackground, string> = {
  plain: "",
  subtle: "bg-zinc-50",
  gradient: "bg-gradient-to-b from-zinc-50 to-white",
};

const WIDTH_CLASSES: Record<CardGridWidth, string> = {
  narrow: "max-w-5xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export default function CardGrid({
  parameters: {
    eyebrow,
    heading,
    subheading,
    link,
    linkText,
    columns,
    background,
    containerWidth,
    headingAlign,
    showDivider,
    sectionId,
  },
  component,
  slots,
}: ComponentProps<CardGridParameters, CardGridSlots>) {
  const isCentered = (headingAlign?.value ?? "center") === "center";
  const href = link?.value?.path;
  // Checkbox values can arrive as booleans or as "true" strings via the API.
  const isDividerShown =
    (showDivider?.value as unknown) === true ||
    (showDivider?.value as unknown) === "true";

  // The eyebrow badge and the footer button are only rendered when Uniform has
  // content for them, in Canvas as well as on the live site. Authors fill the
  // parameter in the side panel first, then the element appears and can be
  // edited inline.
  const showEyebrow = Boolean(eyebrow?.value?.trim());
  const showLink = Boolean(href) && Boolean(linkText?.value?.trim());

  // Keep the subheading in the DOM while editing so authors can click into it,
  // but hide the empty element from visitors.
  const showSubheading =
    Boolean(subheading?.value) ||
    Boolean(subheading?._contextualEditing?.isEditable);

  return (
    <section
      id={sectionId?.value || undefined}
      className={cn(
        "scroll-mt-4 px-6 py-16 md:py-24",
        BACKGROUND_CLASSES[background?.value ?? "plain"],
      )}
    >
      <div
        className={cn(
          "mx-auto",
          WIDTH_CLASSES[containerWidth?.value ?? "default"],
        )}
      >
        <div
          className={cn(
            "mb-8 flex flex-col",
            isCentered ? "items-center text-center" : "items-start text-left",
          )}
        >
          {showEyebrow && (
            <span className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900 [&>svg]:size-3">
              <Sparkles aria-hidden="true" />
              <UniformText
                parameter={eyebrow}
                component={component}
                as="span"
                placeholder="Eyebrow text here..."
              />
            </span>
          )}
          <UniformText
            parameter={heading}
            component={component}
            as="h2"
            className="text-balance text-3xl font-bold text-zinc-900 md:text-4xl"
            placeholder="Heading text here..."
          />
          {showSubheading && (
            <UniformText
              parameter={subheading}
              component={component}
              as="p"
              className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600"
              placeholder="Subheading text here..."
            />
          )}
        </div>
        {isDividerShown && <hr className="mb-8 border-zinc-200" />}
        {/* Cards render their own <li>, so the slot sits directly inside the list */}
        <ul
          className={cn("grid gap-6", COLUMN_CLASSES[columns?.value ?? "3"])}
        >
          <UniformSlot slot={slots.cards} />
        </ul>
        {showLink && (
          <div
            className={cn("mt-12", isCentered ? "text-center" : "text-left")}
          >
            <Link
              href={href ?? "#"}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-10 text-base font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <UniformText
                parameter={linkText}
                component={component}
                as="span"
                placeholder="Link text here..."
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
