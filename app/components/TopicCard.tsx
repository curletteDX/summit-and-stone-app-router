import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

interface TopicCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

export default function TopicCard({
  title,
  description,
  imageUrl,
  imageAlt,
  href,
}: TopicCardProps) {
  return (
    <li className="flex">
      <Card className="group relative w-full gap-0 py-0 transition-shadow hover:shadow-xl focus-within:ring-2 focus-within:ring-zinc-900">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            <p className="text-pretty text-sm text-zinc-600">{description}</p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900"
          />
        </div>
      </Card>
    </li>
  );
}
