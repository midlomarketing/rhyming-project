import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: process.env.NODE_ENV !== 'production',
    },
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
