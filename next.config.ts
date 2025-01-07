import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true,
  },
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/playground/automemo",
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
