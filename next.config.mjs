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
    ],
  },

  async redirects() {
    return [
      { source: "/", destination: "/course", permanent: true },
    ];
  }
};

export default nextConfig;
