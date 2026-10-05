"use client";

import { registerUniformComponent, UniformSlot } from "@uniformdev/canvas-react";

export default function Page() {
  return (
    <main className="min-h-screen">
      <UniformSlot name="content" />
    </main>
  );
}

registerUniformComponent({
  type: "page",
  component: Page,
});
