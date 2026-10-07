import Image from "next/image";

interface NewsArticleHeroProps {
  imageUrl: string;
  imageAlt: string;
  caption?: string;
  credit?: string;
}

/** Large image shown at the top of a news article. */
export default function NewsArticleHero({
  imageUrl,
  imageAlt,
  caption,
  credit,
}: NewsArticleHeroProps) {
  const hasCaption = Boolean(caption || credit);

  return (
    <figure className="mx-auto max-w-5xl px-6 pt-8">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>
      {hasCaption && (
        <figcaption className="mt-3 text-sm text-zinc-500">
          {caption}
          {caption && credit && " "}
          {credit && <span className="text-zinc-400">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
