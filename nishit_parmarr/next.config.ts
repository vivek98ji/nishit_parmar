// import type { NextConfig } from "next";

<<<<<<< HEAD
// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'via.placeholder.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'cdn.zyrosite.com',
//       }
//     ],
//   },
// };


// module.exports = nextConfig;


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
=======
const nextConfig: NextConfig = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
  /* config options here */
  reactStrictMode: true,
>>>>>>> feat-home
};
