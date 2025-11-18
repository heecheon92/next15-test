import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/playground",
        destination: "/playground/automemo",
        permanent: true,
      },
      {
        source: "/playground/route_interception",
        destination: "/playground/route_interception/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
