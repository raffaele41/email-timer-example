/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      './app/api/countdown/route': ['./*.ttf'],
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), '@napi-rs/canvas']
    }
    return config
  }
}
module.exports = nextConfig
