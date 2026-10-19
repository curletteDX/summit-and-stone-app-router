import {
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";

import { cn } from "@/lib/utils";

// The Trailhub feed does not say which unit it uses. Change this if it turns
// out to be kilometres.
const DISTANCE_UNIT = "mi";

// Every value arrives as text because Uniform dynamic tokens resolve to
// strings, for example totalTrails = "9".
interface TrailActivityParameters {
  label: ComponentParameter<string>;
  totalTrails: ComponentParameter<string>;
  openTrails: ComponentParameter<string>;
  totalDistance: ComponentParameter<string>;
}

function toNumber(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getStatus(open: number, total: number) {
  if (open === 0) {
    return { label: "Closed", className: "bg-zinc-100 text-zinc-700" };
  }
  if (open < total) {
    return { label: "Partly open", className: "bg-amber-100 text-amber-900" };
  }
  return { label: "Open", className: "bg-green-100 text-green-900" };
}

export default function TrailActivity({
  parameters: { label, totalTrails, openTrails, totalDistance },
  component,
}: ComponentProps<TrailActivityParameters>) {
  const total = toNumber(totalTrails?.value);
  const open = toNumber(openTrails?.value);
  const status = getStatus(open, total);

  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div>
        <UniformText
          parameter={label}
          component={component}
          as="p"
          className="font-medium text-zinc-900"
          placeholder="Activity here..."
        />
        <p className="text-sm text-zinc-600">
          {total} {total === 1 ? "trail" : "trails"}
          {" · "}
          {toNumber(totalDistance?.value).toFixed(1)} {DISTANCE_UNIT}
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
    </li>
  );
}
