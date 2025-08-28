/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
};
export default nextConfig;
