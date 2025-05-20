// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomfox.ca',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
