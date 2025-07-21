/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, ".."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.lich1257.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
