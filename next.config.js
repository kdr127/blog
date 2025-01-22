/** @type {import('next').NextConfig} */

// TODO: secret
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.kksen.de",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com", // Example additional hostname
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
