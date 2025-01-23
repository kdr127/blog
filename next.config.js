/** @type {import('next').NextConfig} */
require("dotenv").config({ path: ".env.local" });

// TODO: secret
const nextConfig = {
  reactStrictMode: true,
  env: {
    WORDPRESS_AUTH_REFRESH_TOKEN: process.env.WORDPRESS_AUTH_REFRESH_TOKEN,
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
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
