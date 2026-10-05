import type { ReactNode } from "react";

interface TopicCardsProps {
  id?: string;
  heading: string;
  children: ReactNode;
}

export default function TopicCards({ id, heading, children }: TopicCardsProps) {
  return (
    <section id={id} className="scroll-mt-4 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">
          {heading}
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </ul>
      </div>
    </section>
  );
}
