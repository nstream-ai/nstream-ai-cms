/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',  // For Unsplash images
      'blog.nstream.ai',      // For our own domain
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.nstream.ai',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 