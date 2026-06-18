import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out for GitHub Pages
  output: "export",
  // GitHub Pages has no image optimization server
  images: {
    unoptimized: true,
  },
  // Emit /route/index.html so paths resolve cleanly on static hosts
  trailingSlash: true,
};

export default nextConfig;
