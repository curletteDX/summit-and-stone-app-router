import type { NextConfig } from "next";

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
  // Serve the static site at "/" while it is hardcoded. Every other path still
  // goes to the Uniform catch-all route. Remove this rewrite when "/" should
  // come from Uniform.
  async rewrites() {
    return [{ source: "/", destination: "/static" }];
  },
};

export default nextConfig;
