import type { ReactNode } from "react";

// Hardcoded sample content. Later in the course this comes from Uniform: the
// shape below is what a "News Article" content type would hold.

export const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80`;

export interface NewsArticle {
  /** Used in the URL: /static/news/<slug> */
  slug: string;
  title: string;
  /** Short overview shown in the intro and in card listings. */
  summary: string;
  category: string;
  tags: string[];
  /** ISO date string, for example "2026-09-14" */
  publishDate: string;
  /** ISO date string. Only set when the article was revised after publishing. */
  updatedDate?: string;
  readTimeMinutes: number;
  author: { name: string; role: string };
  /** One image, shown large at the top and small in the intro. */
  image: {
    /** Unsplash photo id; the URL is built per size. */
    id: string;
    alt: string;
    caption?: string;
    credit?: string;
  };
  /** Stands in for the Uniform rich text field: plain HTML elements. */
  content: ReactNode;
  /** Slugs of other articles to suggest at the bottom of the page. */
  relatedSlugs: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "plan-your-first-alpine-sunrise-hike",
    title: "How to Plan Your First Alpine Sunrise Hike",
    summary:
      "Start before the stars fade and you will walk into one of the best views of your life. Here is how to prepare.",
    category: "Hiking",
    tags: ["Hiking", "Sunrise", "Beginner"],
    publishDate: "2026-09-14",
    readTimeMinutes: 5,
    author: { name: "Maya Torres", role: "Trail Editor" },
    image: {
      id: "1506905925346-21bda4d32df4",
      alt: "Sunrise above a sea of clouds with snowy peaks in the distance",
      caption: "The first light reaches the ridge about thirty minutes after the summit turns pink.",
      credit: "Photo: Unsplash",
    },
    content: (
      <>
        <p>
          A sunrise hike is simple in theory: walk uphill in the dark, arrive as
          the sky turns pink. In practice, a little planning is the difference
          between a magical morning and a cold, tired one.
        </p>
        <h2>Pick a trail you already know</h2>
        <p>
          Choose a route you have hiked in daylight. Knowing where the trail
          forks, where it gets rocky and how long it takes removes most of the
          stress of moving in the dark.
        </p>
        <h2>Pack for the summit, not the trailhead</h2>
        <p>
          It is warm while you climb and surprisingly cold when you stop. Bring
          the following and you will be comfortable while you wait for the sun:
        </p>
        <ul>
          <li>An insulated layer and a windproof shell</li>
          <li>A hat and gloves, even in summer</li>
          <li>A headlamp with spare batteries</li>
          <li>A thermos of something hot</li>
        </ul>
        <blockquote>
          <p>
            The summit is optional. Getting back down safely is not.
          </p>
        </blockquote>
        <h2>Leave early, and leave a plan</h2>
        <p>
          Aim to reach the top thirty minutes before sunrise. Tell someone where
          you are going and when you expect to be back, then enjoy the view.
        </p>
      </>
    ),
    relatedSlugs: ["reading-the-weather-before-you-summit", "campfire-cooking-one-pot-meals"],
  },
  {
    slug: "reading-the-weather-before-you-summit",
    title: "Reading the Weather Before You Summit",
    summary:
      "Clouds, wind and pressure all tell a story. Learn the signs that say turn around, and the ones that say go.",
    category: "Safety",
    tags: ["Weather", "Safety", "Mountaineering"],
    publishDate: "2026-09-02",
    updatedDate: "2026-09-10",
    readTimeMinutes: 7,
    author: { name: "Jonas Keller", role: "Mountain Guide" },
    image: {
      id: "1470071459604-3b5ec3a7fe05",
      alt: "Low clouds drifting over a green cliff at sunrise",
      caption: "Clouds building against the ridge by mid-morning are a signal to start descending.",
      credit: "Photo: Unsplash",
    },
    content: (
      <>
        <p>
          Mountain weather changes faster than any forecast can follow. The
          good news is that the sky gives plenty of warning to anyone who is
          paying attention.
        </p>
        <h2>Check the forecast, then check the sky</h2>
        <p>
          Read the forecast the night before and again at the trailhead. Then
          compare it with what you can see. If the two disagree, trust the sky.
        </p>
        <h2>Signs it is time to turn around</h2>
        <ol>
          <li>Clouds that build vertically before noon</li>
          <li>A sudden drop in temperature or a shift in wind direction</li>
          <li>A halo around the sun, which often comes before rain</li>
        </ol>
        <h2>Set a turnaround time</h2>
        <p>
          Pick a time before you leave and keep to it, whatever the view looks
          like from where you stand. Most accidents happen when a group pushes
          past the plan for just a little longer.
        </p>
      </>
    ),
    relatedSlugs: ["plan-your-first-alpine-sunrise-hike", "campfire-cooking-one-pot-meals"],
  },
  {
    slug: "campfire-cooking-one-pot-meals",
    title: "Campfire Cooking: Three Easy One-Pot Meals",
    summary:
      "Lightweight, filling and nearly impossible to burn. These dinners will make you the hero of the campsite.",
    category: "Camping",
    tags: ["Camping", "Food", "Recipes"],
    publishDate: "2026-08-21",
    readTimeMinutes: 4,
    author: { name: "Priya Nair", role: "Camp Cook" },
    image: {
      id: "1478131143081-80f7f84ca84d",
      alt: "A group sitting around a campfire at dusk",
      caption: "Dinner is done when the coals turn from red to grey.",
      credit: "Photo: Unsplash",
    },
    content: (
      <>
        <p>
          One pot means less to carry, less to wash and more time around the
          fire. These three dinners all start with the same simple kit.
        </p>
        <h2>Smoky sausage and beans</h2>
        <p>
          Brown sliced sausage in a little oil, add a can of beans and a spoon
          of smoked paprika, and simmer until thick. Serve with bread.
        </p>
        <h2>Lemon herb couscous with chickpeas</h2>
        <p>
          Pour boiling water over couscous, cover it and let it stand for five
          minutes. Stir in chickpeas, olive oil, lemon and whatever herbs you
          packed.
        </p>
        <h2>Foil-pot chili</h2>
        <p>
          Cook onion, mince and tinned tomatoes together, then season with chili
          powder and cumin. It tastes better the longer it sits on the coals.
        </p>
      </>
    ),
    relatedSlugs: ["plan-your-first-alpine-sunrise-hike", "reading-the-weather-before-you-summit"],
  },
];

export const getNewsArticle = (slug: string) =>
  newsArticles.find((article) => article.slug === slug);
