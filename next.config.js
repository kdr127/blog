/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.kksen.de", //TODO secret
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
