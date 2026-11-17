import type { NextConfig } from 'next';

const config: NextConfig = {
  output: process.env.STATIC_EXPORT === '1' ? 'export' : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default config;
