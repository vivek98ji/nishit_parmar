/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.zyrosite.com',  // Add the external domain
      'images.unsplash.com',
      'plus.unsplash.com',
      'cdn-icons-png.flaticon.com'
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
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      }
    ]
  },
}

module.exports = nextConfig 