import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel
    ? {}
    : {
        output: "export",
        basePath: "/Open-Desk",
        assetPrefix: "/Open-Desk/",
      }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;



