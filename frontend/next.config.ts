import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "avatar.vercel.sh",
      port: "",
    }],
  }
};

export default nextConfig;
