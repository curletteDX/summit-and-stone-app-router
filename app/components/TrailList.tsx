import {
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";

import { cn } from "@/lib/utils";

// The Trailhub feed does not say which unit it uses. Change this if it turns
// out to be kilometres.
const DISTANCE_UNIT = "mi";

type ActivitySummary = {
  value: string;
  totalTrails?: number;
  openTrails?: number;
  totalDistance?: number;
};

// One feature's `properties` object from the Trailhub feed. Uniform's Loop
// component hands us one of these per loop item.
type TrailSystemProperties = {
  tsId: string;
  name: string;
  activities?: ActivitySummary[];
};

interface TrailListParameters {
  heading: ComponentParameter<string>;
  subheading: ComponentParameter<string>;
  trailSystems: ComponentParameter<TrailSystemProperties>;
}

function getStatus({ openTrails = 0, totalTrails = 0 }: ActivitySummary) {
  if (openTrails === 0) {
    return { label: "Closed", className: "bg-zinc-100 text-zinc-700" };
  }
  if (openTrails < totalTrails) {
    return { label: "Partly open", className: "bg-amber-100 text-amber-900" };
  }
  return { label: "Open", className: "bg-green-100 text-green-900" };
}

export default function TrailList({
  parameters: { heading, subheading, trailSystems },
  component,
  context,
}: ComponentProps<TrailListParameters>) {
  const trailSystem = trailSystems?.value;

  if (!trailSystem) {
    return context.isContextualEditing ? (
      <p className="px-6 py-3 text-zinc-600">
        Connect the Trail Systems Data parameter to a trail system&apos;s{" "}
        <code>properties</code> inside a Loop.
      </p>
    ) : null;
  }

  // The feed lists every kind of trail. Only show systems that offer hiking.
  const hiking = trailSystem.activities?.find(
    (activity) => activity.value === "hiking",
  );
  if (!hiking) return null;

  const status = getStatus(hiking);
  const trailCount = hiking.totalTrails ?? 0;

  // Keep these in the DOM only when they have content, so a loop does not
  // repeat an empty heading for every trail system.
  const showHeading = Boolean(heading?.value?.trim());
  const showSubheading = Boolean(subheading?.value?.trim());

  return (
    <article className="px-6 py-3">
      <div className="mx-auto max-w-4xl">
        {showHeading && (
          <UniformText
            parameter={heading}
            component={component}
            as="h2"
            className="mb-2 text-balance text-3xl font-bold text-zinc-900 md:text-4xl"
            placeholder="Heading text here..."
          />
        )}
        {showSubheading && (
          <UniformText
            parameter={subheading}
            component={component}
            as="p"
            className="mb-4 max-w-2xl text-pretty text-lg text-zinc-600"
            placeholder="Subheading text here..."
          />
        )}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-5 ring-1 ring-black/10">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">
              {trailSystem.name.trim()}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              {trailCount} {trailCount === 1 ? "trail" : "trails"}
              {" · "}
              {(hiking.totalDistance ?? 0).toFixed(1)} {DISTANCE_UNIT}
            </p>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium",
              status.className,
            )}
          >
            {status.label}
          </span>
        </div>
      </div>
    </article>
  );
}
