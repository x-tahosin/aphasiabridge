/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/aphasiabridge',
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
