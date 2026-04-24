/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'cdn-g.apeuni.com' },
      { hostname: 'dl26yht2ovo33.cloudfront.net' },
    ],
  },
}

module.exports = nextConfig
