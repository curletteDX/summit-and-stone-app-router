import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface LatestArticlesProps {
  id?: string;
  heading: string;
  viewAllHref: string;
  viewAllText?: string;
  children: ReactNode;
}

export default function LatestArticles({
  id,
  heading,
  viewAllHref,
  viewAllText = "See all News & Views",
  children,
}: LatestArticlesProps) {
  return (
    <section id={id} className="scroll-mt-4 px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900 md:text-4xl">
          {heading}
        </h2>
        <hr className="mb-8 border-zinc-200" />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">{children}</ul>
        <div className="mt-12 text-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={viewAllHref} />}
            className="h-12 px-10 text-base"
          >
            {viewAllText}
          </Button>
        </div>
      </div>
    </section>
  );
}
