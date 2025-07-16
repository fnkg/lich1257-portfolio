/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.lich1257.com",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
  eslint: {
    dirs: ["src"],
  },
};

module.exports = nextConfig;
