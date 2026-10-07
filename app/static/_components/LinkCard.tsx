import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type LinkCardImageRatio = "standard" | "wide" | "square";
export type LinkCardHoverEffect = "zoom" | "none";

interface LinkCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  imageRatio?: LinkCardImageRatio;
  showArrow?: boolean;
  showDescription?: boolean;
  hoverEffect?: LinkCardHoverEffect;
}

// Full class names are listed so Tailwind v4 can detect them at build time.
const RATIO_CLASSES: Record<LinkCardImageRatio, string> = {
  standard: "aspect-[4/3]",
  wide: "aspect-video",
  square: "aspect-square",
};

export default function LinkCard({
  title,
  description,
  imageUrl,
  imageAlt,
  href,
  imageRatio = "standard",
  showArrow = false,
  showDescription = true,
  hoverEffect = "zoom",
}: LinkCardProps) {
  return (
    <li className="flex">
      <div className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-white text-sm text-zinc-900 ring-1 ring-black/10 transition-shadow focus-within:ring-2 focus-within:ring-zinc-900 hover:shadow-xl">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            RATIO_CLASSES[imageRatio],
          )}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover",
              hoverEffect === "zoom" &&
                "transition-transform duration-500 group-hover:scale-105",
            )}
          />
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-zinc-900">
              {/* The stretched ::after makes the whole card clickable with one link */}
              <Link
                href={href}
                className="outline-none after:absolute after:inset-0"
              >
                {title}
              </Link>
            </h3>
            {showDescription && description && (
              <p className="line-clamp-3 text-pretty text-sm text-zinc-600">
                {description}
              </p>
            )}
          </div>
          {showArrow && (
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
