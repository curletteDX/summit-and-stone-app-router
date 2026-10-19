import {
  UniformSlot,
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";

// This component has no data logic. In Uniform, an outer Loop repeats it once
// per trail system and binds `name` to the loop item's /properties/name.
// An inner Loop in the `activities` slot repeats Trail Activity once per
// entry in /properties/activities.
interface TrailSystemParameters {
  name: ComponentParameter<string>;
}

type TrailSystemSlots = "activities";

export default function TrailSystem({
  parameters: { name },
  component,
  slots,
}: ComponentProps<TrailSystemParameters, TrailSystemSlots>) {
  return (
    <article className="px-6 py-3">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-5 ring-1 ring-black/10">
        <UniformText
          parameter={name}
          component={component}
          as="h3"
          className="text-lg font-semibold text-zinc-900"
          placeholder="Trail system name here..."
        />
        {/* Trail Activity renders its own <li>, so the slot sits inside the list */}
        <ul className="mt-3 divide-y divide-zinc-100">
          <UniformSlot slot={slots.activities} />
        </ul>
      </div>
    </article>
  );
}
