/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      }
    ],
  },

  async redirects() {
    return [
      { source: "/", destination: "/course", permanent: true },
    ];
  }
};

export default nextConfig;
