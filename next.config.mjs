/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'sneakerbardetroit.com',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn.hypb.st',
      },
      {
        protocol: 'https',
        hostname: 'image.goat.com',
      },
      {
        protocol: 'https',
        hostname: 'images.stockx.com',
      },
      {
        protocol: 'https',
        hostname: 'stockx-assets.imgix.net',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
