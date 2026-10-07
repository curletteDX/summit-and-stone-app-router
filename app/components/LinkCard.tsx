import {
  flattenValues,
  type AssetParamValue,
  type LinkParamValue,
} from "@uniformdev/canvas";
import {
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LinkCardImageRatio = "standard" | "wide" | "square";
type LinkCardHoverEffect = "zoom" | "none";

interface LinkCardParameters {
  title: ComponentParameter<string>;
  description: ComponentParameter<string>;
  image: ComponentParameter<AssetParamValue>;
  link: ComponentParameter<LinkParamValue>;
  imageRatio: ComponentParameter<LinkCardImageRatio>;
  hoverEffect: ComponentParameter<LinkCardHoverEffect>;
  showDescription: ComponentParameter<boolean>;
  showArrow: ComponentParameter<boolean>;
}

// Full class names are listed so Tailwind v4 can detect them at build time.
const RATIO_CLASSES: Record<LinkCardImageRatio, string> = {
  standard: "aspect-[4/3]",
  wide: "aspect-video",
  square: "aspect-square",
};

// Checkbox values can arrive as real booleans or as "true"/"false" strings
// (for example when content is written through the API).
function toBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
}

export default function LinkCard({
  parameters: {
    title,
    description,
    image,
    link,
    imageRatio,
    hoverEffect,
    showDescription,
    showArrow,
  },
  component,
}: ComponentProps<LinkCardParameters>) {
  const asset = flattenValues(image?.value, { toSingle: true });
  const imageUrl = asset?.url;
  const imageAlt = asset?.description || asset?.title || title?.value || "";
  const href = link?.value?.path ?? "#";

  const ratio = imageRatio?.value ?? "standard";
  const zoomOnHover = (hoverEffect?.value ?? "zoom") === "zoom";
  // Checkbox parameters with no stored value fall back to the design defaults.
  const isDescriptionShown = toBoolean(showDescription?.value, true);
  const isArrowShown = toBoolean(showArrow?.value, false);

  // In Canvas the stretched link overlay would swallow every click and editable
  // text can't take a caret inside an anchor, so the link is dropped while editing.
  const isEditing =
    Boolean(title?._contextualEditing?.isEditable) ||
    Boolean(description?._contextualEditing?.isEditable);

  // Keep the description in the DOM while editing so authors can click into it,
  // but hide the empty element from visitors.
  const hasDescription =
    isDescriptionShown &&
    (Boolean(description?.value) ||
      Boolean(description?._contextualEditing?.isEditable));

  const titleText = (
    <UniformText
      parameter={title}
      component={component}
      as="span"
      placeholder="Card title here..."
    />
  );

  return (
    <li className="flex">
      <div className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white text-sm text-zinc-900 ring-1 ring-black/10 transition-shadow focus-within:ring-2 focus-within:ring-zinc-900 hover:shadow-xl">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-zinc-100",
            RATIO_CLASSES[ratio],
          )}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover",
                zoomOnHover &&
                  "transition-transform duration-500 group-hover:scale-105",
              )}
            />
          )}
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-zinc-900">
              {isEditing ? (
                titleText
              ) : (
                // The stretched ::after makes the whole card clickable with one link
                <Link
                  href={href}
                  className="outline-none after:absolute after:inset-0"
                >
                  {titleText}
                </Link>
              )}
            </h3>
            {hasDescription && (
              <UniformText
                parameter={description}
                component={component}
                as="p"
                className={cn(
                  "text-pretty text-sm text-zinc-600",
                  // Clamped text can hide the caret, so show it in full while editing.
                  !isEditing && "line-clamp-3",
                )}
                placeholder="Card description here..."
              />
            )}
          </div>
          {isArrowShown && (
            <ArrowRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900"
            />
          )}
        </div>
      </div>
    </li>
  );
}
