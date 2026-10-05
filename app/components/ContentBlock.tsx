import Link from "next/link";
import type { ReactNode } from "react";

interface ContentBlockProps {
  heading: string;
  children: ReactNode;
  linkHref?: string;
  linkText?: string;
}

export default function ContentBlock({
  heading,
  children,
  linkHref,
  linkText = "Learn more",
}: ContentBlockProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">
        {heading}
      </h2>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-700">
        {children}
      </div>
      {linkHref && (
        <Link
          href={linkHref}
          className="mt-8 inline-block text-lg font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
        >
          {linkText}
        </Link>
      )}
    </section>
  );
}
