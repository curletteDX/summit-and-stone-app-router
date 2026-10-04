"use client";

import Image from "next/image";
import { flattenValues, type AssetParamValue } from "@uniformdev/canvas";
import {
  registerUniformComponent,
  UniformText,
  type ComponentProps,
} from "@uniformdev/canvas-react";

type HeroSectionProps = ComponentProps<{
  image?: AssetParamValue;
}>;

export default function HeroSection({ image }: HeroSectionProps) {
  const imageUrl = flattenValues(image, { toSingle: true })?.url;

  return (
    <section className="relative w-full" style={{ aspectRatio: "5/2" }}>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col justify-center h-full px-12">
        <UniformText
          parameterId="title"
          as="h1"
          placeholder="Enter a title"
          className="text-5xl md:text-6xl font-bold text-white"
        />
        <UniformText
          parameterId="subtitle"
          as="p"
          placeholder="Enter a subtitle"
          className="text-xl text-zinc-300 mt-4 max-w-2xl"
        />
      </div>
    </section>
  );
}

registerUniformComponent({
  type: "hero",
  component: HeroSection,
});
