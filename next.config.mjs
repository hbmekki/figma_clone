/** @type {import('next').NextConfig} */

const nextConfig = {

    assetPrefix: process.env.NEXT_PUBLIC_NOT_GITHUB? '' : '/figma_clone',
    basePath: process.env.NEXT_PUBLIC_NOT_GITHUB? '' : '/figma_clone',
    output: "export",
    reactStrictMode: true,

    images: {

        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'liveblocks.io',
                port: ''
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
