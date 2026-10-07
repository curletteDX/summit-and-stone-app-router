import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CardGrid from "@/app/static/_components/CardGrid";
import LinkCard from "@/app/static/_components/LinkCard";
import NewsArticleBody from "@/app/static/_components/NewsArticleBody";
import NewsArticleHero from "@/app/static/_components/NewsArticleHero";
import NewsArticleIntro from "@/app/static/_components/NewsArticleIntro";
import { getNewsArticle, newsArticles, unsplash } from "@/app/static/_data/news";

type NewsArticlePageProps = { params: Promise<{ slug: string }> };

// Hardcoded sample content. Later in the course this comes from Uniform.
export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Summit & Stone`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [article.author.name],
      tags: article.tags,
      images: [{ url: unsplash(article.image.id, 1200), alt: article.image.alt }],
    },
  };
}

export default async function StaticNewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const related = article.relatedSlugs
    .map(getNewsArticle)
    .filter((item) => item !== undefined);

  return (
    <>
      <article>
        <NewsArticleHero
          imageUrl={unsplash(article.image.id, 1600)}
          imageAlt={article.image.alt}
          caption={article.image.caption}
          credit={article.image.credit}
        />
        <NewsArticleIntro
          title={article.title}
          summary={article.summary}
          category={article.category}
          authorName={article.author.name}
          authorRole={article.author.role}
          publishDate={article.publishDate}
          updatedDate={article.updatedDate}
          readTimeMinutes={article.readTimeMinutes}
          thumbnailUrl={unsplash(article.image.id, 400)}
        />
        <NewsArticleBody tags={article.tags}>{article.content}</NewsArticleBody>
      </article>

      {related.length > 0 && (
        <CardGrid
          heading="More News and Views"
          columns="2"
          containerWidth="narrow"
          background="subtle"
          headingAlign="left"
        >
          {related.map((item) => (
            <LinkCard
              key={item.slug}
              title={item.title}
              description={item.summary}
              imageUrl={unsplash(item.image.id, 600)}
              imageAlt={item.image.alt}
              href={`/static/news/${item.slug}`}
              imageRatio="wide"
            />
          ))}
        </CardGrid>
      )}
    </>
  );
}
