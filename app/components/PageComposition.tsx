"use client";

import type { RootComponentInstance } from "@uniformdev/canvas";
import { UniformComposition } from "@uniformdev/canvas-react";

import "./registerComponents";

export default function PageComposition({
  data,
}: {
  data: RootComponentInstance;
}) {
  return <UniformComposition data={data} />;
}
