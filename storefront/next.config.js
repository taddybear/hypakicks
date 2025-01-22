const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "hypakicks-production.up.railway.app",
      },
    ],
  },
  experimental: {},
  // async redirects() {
  //   return [
  //     {
  //       source: "/us/:path*",
  //       has: [
  //         {
  //           type: "query",
  //           key: "success",
  //           // the page value will not be available in the
  //           // destination since value is provided and doesn't
  //           // use a named capture group e.g. (?<page>home)
  //           value: "true",
  //         },
  //       ],
  //       permanent: false,
  //       destination: "/another/:path*",
  //     },
  //   ]
  // },
}

module.exports = nextConfig
