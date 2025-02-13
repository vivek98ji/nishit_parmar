/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.zyrosite.com',  // Add the external domain
      'images.unsplash.com',
      'plus.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.zyrosite.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      }
    ]
  },
}

module.exports = nextConfig 