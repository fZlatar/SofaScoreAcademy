import { withKumaUI } from '@kuma-ui/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    rewrites: async () => {
        return [{ source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }]
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/football',
                permanent: true,
            },
        ]
    },
}

export default withKumaUI(nextConfig)
