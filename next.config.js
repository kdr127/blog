/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.hypedigital.de",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
