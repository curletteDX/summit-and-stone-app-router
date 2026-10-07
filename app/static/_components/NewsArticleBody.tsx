import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface NewsArticleBodyProps {
  /** Rich text content: plain h2, h3, p, ul, ol, blockquote and a elements. */
  children: ReactNode;
  tags?: string[];
}

// The rich text arrives as plain HTML elements, so the typography is applied
// from the wrapper. Full class names are listed so Tailwind v4 can detect them.
const RICH_TEXT_CLASSES = [
  "space-y-5 text-lg leading-relaxed text-zinc-700",
  "[&_h2]:pt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-zinc-900",
  "[&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-zinc-900",
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-amber-400 [&_blockquote]:pl-5 [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-zinc-900",
  "[&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-blue-900",
].join(" ");

/** The article text, its tags and a link back to the news list. */
export default function NewsArticleBody({ children, tags = [] }: NewsArticleBodyProps) {
  return (
    // max-w-5xl matches the hero image above it
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className={RICH_TEXT_CLASSES}>{children}</div>

      {tags.length > 0 && (
        <section aria-labelledby="article-tags" className="mt-12">
          <h2 id="article-tags" className="sr-only">
            Tags
          </h2>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        href="/static#news"
        className="mt-10 inline-flex items-center gap-2 font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to all news
      </Link>
    </div>
  );
}
