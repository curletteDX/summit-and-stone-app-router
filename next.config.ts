import type { NextConfig } from "next";
import { withUniformConfig } from "@uniformdev/next-app-router/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
      {
        protocol: "https",
        hostname: "img.uniform.global",
      },
    ],
  },
};

export default withUniformConfig(nextConfig);
