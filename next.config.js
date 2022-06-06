/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  experimental: {
    outputStandalone: true,
  },
}
