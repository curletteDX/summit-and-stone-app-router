import Image from "next/image";
import type { ReactNode } from "react";

interface BlogArticleDetailProps {
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  /** ISO date string, for example "2026-09-14" */
  date: string;
  children: ReactNode;
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export default function BlogArticleDetail({
  title,
  summary,
  imageUrl,
  imageAlt,
  date,
  children,
}: BlogArticleDetailProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold text-zinc-900">{title}</h1>
      <p className="mb-8 text-xl text-zinc-600">{summary}</p>
      <div className="relative mb-4 aspect-[2/1] w-full overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          preload
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
      <p className="mb-8 text-sm text-zinc-500">
        <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
      </p>
      <div className="space-y-5 text-lg leading-relaxed text-zinc-700">
        {children}
      </div>
    </article>
  );
}
