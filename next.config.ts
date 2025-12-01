import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        port: '',
        pathname: '/car-rental-task/**',
      },
    ],
  },
  // Ensure Turbopack resolves workspace root correctly
  turbopack: {
    // explicitly point to project root (where next.config.ts lives)
    root: path.resolve(__dirname),
  } as any,
};

export default nextConfig;
