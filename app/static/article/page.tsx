import BlogArticleDetail from "@/app/components/BlogArticleDetail";

// Hardcoded sample content. Later in the course this comes from Uniform.
export default function StaticArticlePage() {
  return (
    <BlogArticleDetail
      title="How to Plan Your First Alpine Sunrise Hike"
      summary="Start before the stars fade and you will walk into one of the best views of your life."
      imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
      imageAlt="Sunrise above a sea of clouds with snowy peaks in the distance"
      date="2026-09-14"
    >
      <p>
        A sunrise hike is simple in theory: walk uphill in the dark, arrive as
        the sky turns pink. In practice, a little planning is the difference
        between a magical morning and a cold, tired one.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-zinc-900">
        Pick a trail you already know
      </h2>
      <p>
        Choose a route you have hiked in daylight. Knowing where the trail
        forks, where it gets rocky and how long it takes removes most of the
        stress of moving in the dark.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-zinc-900">
        Pack for the summit, not the trailhead
      </h2>
      <p>
        It is warm while you climb and surprisingly cold when you stop. Bring an
        insulated layer, a hat, gloves and a thermos of something hot. A
        headlamp with spare batteries is not optional.
      </p>
      <h2 className="pt-4 text-2xl font-bold text-zinc-900">
        Leave early, and leave a plan
      </h2>
      <p>
        Aim to reach the top thirty minutes before sunrise. Tell someone where
        you are going and when you expect to be back, then enjoy the view.
      </p>
    </BlogArticleDetail>
  );
}
