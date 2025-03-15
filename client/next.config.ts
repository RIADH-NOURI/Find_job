// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public', // Service worker destination
  register: true, // Register the service worker
  skipWaiting: true, // Activate the service worker immediately
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // Enable bundle analysis via env variable
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['res.cloudinary.com'],
    },
  })
);
