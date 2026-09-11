/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'forpencil.com',
      },
      {
        protocol: 'https',
        hostname: '*.forpencil.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
