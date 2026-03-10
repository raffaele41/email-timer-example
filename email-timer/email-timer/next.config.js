/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/countdown': [
        './email-timer/email-timer/Roboto-VariableFont_wdth,wght.ttf'
      ],
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
