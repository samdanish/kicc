import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image Optimization Strategy */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Allows Next.js to optimize your Cloudinary images
      },
    ],
  },

  /* Advanced Security Headers */
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            // Forces browsers to only connect via HTTPS
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            // Prevents Clickjacking by forbidding your site from being put in an iframe
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            // Prevents browsers from guessing the MIME type, stopping XSS exploits
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Controls how much referrer information is passed on routing
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

export default nextConfig;