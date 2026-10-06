import Image from "next/image";
import Link from "next/link";


interface BlogArticleIntroProps {
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

export default function BlogArticleIntro({
  title,
  summary,
  imageUrl,
  imageAlt,
  href,
}: BlogArticleIntroProps) {
  return (
    <li className="flex">
      <div className="group relative w-full flex flex-col overflow-hidden rounded-xl bg-white text-sm text-zinc-900 ring-1 ring-black/10 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-zinc-900">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold text-zinc-900">
            <Link href={href} className="outline-none after:absolute after:inset-0">
              {title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm text-zinc-600">{summary}</p>
        </div>
      </div>
    </li>
  );
}
