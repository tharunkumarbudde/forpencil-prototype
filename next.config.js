/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/forpencil-prototype',
  images: {
    unoptimized: true,
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
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
