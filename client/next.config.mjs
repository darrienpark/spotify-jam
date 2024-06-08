/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:3001/auth/:path*", // Proxy to Backend
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
