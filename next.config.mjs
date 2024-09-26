/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.nyxbui.design'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb'
    }
  }
}

export default nextConfig
