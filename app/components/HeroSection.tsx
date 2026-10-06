import Image from "next/image";
import { flattenValues, type AssetParamValue } from "@uniformdev/canvas";
import {
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";

type HeroParameters = {
  title: ComponentParameter<string>;
  subtitle: ComponentParameter<string>;
  image: ComponentParameter<AssetParamValue>;
};

export default function HeroSection({
  parameters: { title, subtitle, image },
  component,
}: ComponentProps<HeroParameters>) {
  const asset = flattenValues(image?.value, { toSingle: true });
  const imageUrl = asset?.url;
  // Keep the subtitle in the DOM while editing so authors can click into it,
  // but hide the empty element for visitors.
  const showSubtitle =
    Boolean(subtitle?.value) || Boolean(subtitle?._contextualEditing?.isEditable);

  return (
    <section
      className="relative min-h-80 w-full"
      style={{ aspectRatio: "5/2" }}
    >
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
      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12">
        <UniformText
          component={component}
          parameter={title}
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
          placeholder="Enter a title"
        />
        {showSubtitle && (
          <UniformText
            component={component}
            parameter={subtitle}
            as="p"
            className="text-xl text-zinc-300 mt-4 max-w-2xl"
            placeholder="Enter a subtitle"
          />
        )}
      </div>
    </section>
  );
}
