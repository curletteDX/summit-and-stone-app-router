import BlogArticleIntro from "@/app/components/BlogArticleIntro";
import ContentBlock from "@/app/components/ContentBlock";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import HeroSection from "@/app/components/HeroSection";
import ImageWithText from "@/app/components/ImageWithText";
import LatestArticles from "@/app/components/LatestArticles";
import ProductCard from "@/app/components/ProductCard";
import TopicCard from "@/app/components/TopicCard";
import TopicCards from "@/app/components/TopicCards";

// Every value on this page is hardcoded sample content.
// Later in the course you will replace these with real data.
const photo = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?w=${width}&q=80`;

const topics = [
  {
    title: "Hiking",
    description: "Trail-tested packs, boots and layers for day hikes and long treks.",
    imageUrl: photo("1551632811-561732d1e306", 800),
    imageAlt: "Two hikers with backpacks walking a mountain trail",
    href: "/#featured-products",
  },
  {
    title: "Climbing",
    description: "Ropes, harnesses and shoes for rock walls and sea cliffs alike.",
    imageUrl: photo("1522163182402-834f871fd851", 800),
    imageAlt: "A climber in a yellow shirt hanging from an overhanging cliff",
    href: "/#featured-products",
  },
  {
    title: "Biking",
    description: "Road and commuter bikes built for long days in the saddle.",
    imageUrl: photo("1541625602330-2277a4c46182", 800),
    imageAlt: "Two cyclists riding road bikes along a coastal road",
    href: "/#featured-products",
  },
];

const products = [
  {
    title: "Ridgeline 28L Daypack",
    description: "A light, weatherproof pack with a padded laptop sleeve and a trail-ready hip belt.",
    imageUrl: photo("1553062407-98eeb64c6a62", 600),
    imageAlt: "A navy blue backpack standing on a light floor",
    price: 129,
    categories: ["hiking"],
    available: true,
  },
  {
    title: "Basecamp 3-Person Tent",
    description: "Freestanding three-season tent that pitches in under five minutes.",
    imageUrl: photo("1445308394109-4ec2920981b1", 600),
    imageAlt: "A yellow tent pitched beside a log with red cliffs behind",
    price: 349.5,
    categories: ["camping", "hiking"],
    available: true,
  },
  {
    title: "Aero Carbon Road Bike",
    description: "A race-ready carbon frame with deep-section wheels and 22 speeds.",
    imageUrl: photo("1532298229144-0ec0c57515c7", 600),
    imageAlt: "A black carbon road bike against a dark background",
    price: 2499,
    categories: ["biking"],
    available: false,
  },
  {
    title: "Heritage Commuter Bike",
    description: "A classic single-speed city bike with leather grips and a matching saddle.",
    imageUrl: photo("1571068316344-75bc76f77890", 600),
    imageAlt: "A silver commuter bike with tan leather saddle leaning on a wall",
    price: 799,
    categories: ["biking"],
    available: true,
  },
];

const articles = [
  {
    title: "How to Plan Your First Alpine Sunrise Hike",
    summary: "Start before the stars fade and you will walk into one of the best views of your life. Here is how to prepare.",
    imageUrl: photo("1506905925346-21bda4d32df4", 600),
    imageAlt: "Sunrise above a sea of clouds with snowy peaks in the distance",
  },
  {
    title: "Reading the Weather Before You Summit",
    summary: "Clouds, wind and pressure all tell a story. Learn the signs that say turn around, and the ones that say go.",
    imageUrl: photo("1470071459604-3b5ec3a7fe05", 600),
    imageAlt: "Low clouds drifting over a green cliff at sunrise",
  },
  {
    title: "Campfire Cooking: Three Easy One-Pot Meals",
    summary: "Lightweight, filling and nearly impossible to burn. These dinners will make you the hero of the campsite.",
    imageUrl: photo("1478131143081-80f7f84ca84d", 600),
    imageAlt: "A group sitting around a campfire at dusk",
  },
];

export default function StaticHomePage() {
  return (
    <>
      <HeroSection
        title="Summit & Stone"
        subtitle="Premium outdoor gear for every adventure"
        imageUrl={photo("1464822759023-fed622ff2c3b", 1600)}
      />

      <ContentBlock
        heading="Built for the trail ahead"
        linkHref="/article"
        linkText="Read our latest story"
      >
        <p>
          Summit &amp; Stone started with two friends, one borrowed tent and a
          forecast that turned out to be wrong. We learned quickly which gear
          earns its place in your pack and which stays at home.
        </p>
        <p>
          Today we design and test equipment for hikers, climbers and cyclists
          who care about quality, repairability and the places we all love to
          explore.
        </p>
      </ContentBlock>

      <ImageWithText
        heading="Gear that goes the distance"
        subheading="Tested by guides, trusted by weekend wanderers"
        imageUrl={photo("1551632811-561732d1e306", 1000)}
        imageAlt="Hikers walking along a mountain trail beneath snowy peaks"
        imagePosition="left"
      >
        <p>
          Every product spends a season in the field before it reaches our
          shelves. Our testers log hundreds of miles in rain, wind and sun, then
          tell us exactly what to fix.
        </p>
        <p>
          The result is gear you can rely on when the weather turns and the
          trail gets long.
        </p>
      </ImageWithText>

      <TopicCards id="topics" heading="Explore by Adventure">
        {topics.map((topic) => (
          <TopicCard key={topic.title} {...topic} />
        ))}
      </TopicCards>

      <FeaturedProducts
        id="featured-products"
        heading="Our Top Picks"
        subheading="Explore a curated selection of premium outdoor gear, chosen by our testers."
      >
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </FeaturedProducts>

      <LatestArticles
        id="news"
        heading="Latest News and Views"
        viewAllHref="/article"
      >
        {articles.map((article) => (
          <BlogArticleIntro
            key={article.title}
            {...article}
            href="/article"
          />
        ))}
      </LatestArticles>
    </>
  );
}
