/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Required for GitHub Pages if not using a custom domain
  basePath: process.env.NODE_ENV === 'production' ? '/forpencil-prototype' : '',
  images: {
    unoptimized: true, // Required for static export
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
  },
};

module.exports = nextConfig;
