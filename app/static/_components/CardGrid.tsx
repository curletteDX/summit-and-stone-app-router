import { Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Layout / style options are plain string unions on purpose: later they map
// one-to-one onto Uniform `select` parameters that the CMS editor can choose.
export type CardGridColumns = "2" | "3" | "4";
export type CardGridBackground = "plain" | "subtle" | "gradient";
export type CardGridWidth = "narrow" | "default" | "wide";
export type CardGridHeadingAlign = "center" | "left";

interface CardGridProps {
  id?: string;
  heading: string;
  subheading?: string;
  /** Small badge shown above the heading, e.g. "Featured Collection". */
  eyebrow?: string;
  /** Footer button. Only rendered when `linkHref` is set. */
  linkHref?: string;
  linkText?: string;
  columns?: CardGridColumns;
  background?: CardGridBackground;
  containerWidth?: CardGridWidth;
  headingAlign?: CardGridHeadingAlign;
  showDivider?: boolean;
  /** The cards. Becomes a Uniform slot later, so any card type can go here. */
  children: ReactNode;
}

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
  id,
  heading,
  subheading,
  eyebrow,
  linkHref,
  linkText = "See all",
  columns = "3",
  background = "plain",
  containerWidth = "default",
  headingAlign = "center",
  showDivider = false,
  children,
}: CardGridProps) {
  const isCentered = headingAlign === "center";

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-4 px-6 py-16 md:py-24",
        BACKGROUND_CLASSES[background],
      )}
    >
      <div className={cn("mx-auto", WIDTH_CLASSES[containerWidth])}>
        <div
          className={cn(
            "mb-8 flex flex-col",
            isCentered ? "items-center text-center" : "items-start text-left",
          )}
        >
          {eyebrow && (
            <span className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900 [&>svg]:size-3">
              <Sparkles aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h2 className="text-balance text-3xl font-bold text-zinc-900 md:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600">
              {subheading}
            </p>
          )}
        </div>
        {showDivider && <hr className="mb-8 border-zinc-200" />}
        <ul className={cn("grid gap-6", COLUMN_CLASSES[columns])}>{children}</ul>
        {linkHref && (
          <div className={cn("mt-12", isCentered ? "text-center" : "text-left")}>
            <Link
              href={linkHref}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-zinc-900 px-10 text-base font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
