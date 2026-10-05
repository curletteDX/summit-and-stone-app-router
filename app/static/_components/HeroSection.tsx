import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
}: HeroSectionProps) {
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-xl text-zinc-300 mt-4 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
