/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.HOST
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

export default nextConfig;
