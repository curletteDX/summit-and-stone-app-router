import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";


interface FeaturedProductsProps {
  id?: string;
  heading: string;
  subheading?: string;
  children: ReactNode;
}

export default function FeaturedProducts({
  id,
  heading,
  subheading,
  children,
}: FeaturedProductsProps) {
  return (
    <section
      id={id}
      className="scroll-mt-4 bg-gradient-to-b from-zinc-50 to-white px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900 [&>svg]:size-3">
            <Sparkles aria-hidden="true" />
            Featured Collection
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-zinc-900 md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {subheading && (
            <p className="max-w-2xl text-pretty text-lg text-zinc-600">
              {subheading}
            </p>
          )}
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </ul>
      </div>
    </section>
  );
}
