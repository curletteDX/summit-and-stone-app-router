import { Calendar, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/app/static/_lib/formatDate";

interface NewsArticleIntroProps {
  title: string;
  summary: string;
  category: string;
  authorName: string;
  authorRole?: string;
  /** ISO date string, for example "2026-09-14" */
  publishDate: string;
  /** ISO date string. Shown only when set. */
  updatedDate?: string;
  readTimeMinutes?: number;
  /** Smaller version of the article image. */
  thumbnailUrl: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Breadcrumb, category, title, summary, byline and a small image. */
export default function NewsArticleIntro({
  title,
  summary,
  category,
  authorName,
  authorRole,
  publishDate,
  updatedDate,
  readTimeMinutes,
  thumbnailUrl,
}: NewsArticleIntroProps) {
  return (
    // max-w-5xl matches the hero image and the article body
    <header className="mx-auto max-w-5xl px-6 pt-10">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link
              href="/static"
              className="underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li>
            <Link
              href="/static#news"
              className="underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              News
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-4" />
          </li>
          <li
            aria-current="page"
            className="max-w-[16rem] truncate font-medium text-zinc-700 sm:max-w-md"
          >
            {title}
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="mb-4 inline-flex w-fit items-center rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-900">
            {category}
          </span>
          <h1 className="text-balance text-4xl font-bold text-zinc-900 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-xl text-zinc-600">{summary}</p>
        </div>
        {/* Decorative: the full image with its description is shown at the top of the page */}
        <div className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:size-36">
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-zinc-200 py-4 text-sm text-zinc-600">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white"
          >
            {initials(authorName)}
          </span>
          <p>
            <span className="sr-only">Written by </span>
            <span className="block font-medium text-zinc-900">{authorName}</span>
            {authorRole && <span className="block text-zinc-500">{authorRole}</span>}
          </p>
        </div>
        <p className="flex items-center gap-2">
          <Calendar aria-hidden="true" className="size-4" />
          <span className="sr-only">Published </span>
          <time dateTime={publishDate}>{formatDate(publishDate)}</time>
        </p>
        {updatedDate && (
          <p className="text-zinc-500">
            Updated <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
          </p>
        )}
        {readTimeMinutes !== undefined && (
          <p className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4" />
            {readTimeMinutes} min read
          </p>
        )}
      </div>
    </header>
  );
}
