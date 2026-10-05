import Image from "next/image";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageWithTextProps {
  heading: string;
  subheading?: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  children: ReactNode;
}

export default function ImageWithText({
  heading,
  subheading,
  imageUrl,
  imageAlt,
  imagePosition = "left",
  children,
}: ImageWithTextProps) {
  return (
    <section className="px-6 py-16 md:py-24">
      <Card className="mx-auto max-w-6xl p-0">
        <div
          className={cn(
            "flex flex-col",
            imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row",
          )}
        >
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:min-h-[420px] md:w-1/2">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-4 p-8 md:w-1/2 md:p-12">
            <h2 className="text-balance text-3xl font-bold text-zinc-900 md:text-4xl">
              {heading}
            </h2>
            {subheading && (
              <p className="text-pretty text-lg text-zinc-600">{subheading}</p>
            )}
            <div className="space-y-4 text-zinc-700">{children}</div>
          </div>
        </div>
      </Card>
    </section>
  );
}
