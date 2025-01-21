/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // #VAR
        hostname: "wp.kksen.de",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
