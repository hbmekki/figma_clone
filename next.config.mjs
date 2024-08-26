/** @type {import('next').NextConfig} */

const nextConfig = {

    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
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
