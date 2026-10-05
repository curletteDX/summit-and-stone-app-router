import type { Metadata } from "next";
import type { ReactNode } from "react";

import NavBar from "@/app/static/_components/NavBar";

export const metadata: Metadata = {
  title: "Summit & Stone",
  description: "Premium outdoor gear for every adventure.",
};

export default function StaticLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
