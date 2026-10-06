import { Check, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price?: number;
  categories?: string[];
  available?: boolean;
}

const BADGE_CLASSES =
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium [&>svg]:size-3";

const categoryColors: Record<string, string> = {
  hiking: "bg-emerald-100 text-emerald-900",
  camping: "bg-amber-100 text-amber-900",
  biking: "bg-sky-100 text-sky-900",
};

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductCard({
  title,
  description,
  imageUrl,
  imageAlt,
  price,
  categories = [],
  available = true,
}: ProductCardProps) {
  return (
    <li className="flex">
      <div className="w-full flex flex-col overflow-hidden rounded-xl bg-white text-sm text-zinc-900 ring-1 ring-black/10 transition-shadow hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          {categories.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <span
                  key={category}
                  className={cn(
                    BADGE_CLASSES,
                    "capitalize",
                    categoryColors[category] ?? "bg-zinc-100 text-zinc-900",
                  )}
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          <span
            className={cn(
              BADGE_CLASSES,
              "absolute right-3 top-3",
              available
                ? "bg-emerald-100 text-emerald-900"
                : "bg-red-100 text-red-900",
            )}
          >
            {available ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
            {available ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="line-clamp-2 text-lg font-bold text-zinc-900">
            {title}
          </h3>
          <p className="line-clamp-3 text-pretty text-sm text-zinc-600">
            {description}
          </p>
          <p className="mt-auto border-t border-zinc-100 pt-4 text-xl font-bold text-zinc-900">
            {price !== undefined ? (
              priceFormat.format(price)
            ) : (
              <span className="text-sm font-normal text-zinc-500">
                Price on request
              </span>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
