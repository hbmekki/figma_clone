/** @type {import('next').NextConfig} */

const nextConfig = {

    // basePath: process.env.GITHUB_ACTIONS?  `${process.env?.GITHUB_REPOSITORY.replace(/.*?\//, '/')}`: '',
    // assetPrefix: process.env.GITHUB_ACTIONS?  `${process.env?.GITHUB_REPOSITORY.replace(/.*?\//, '/')}`: '',
    // basePath: process.env.NEXT_PUBLIC_PREFIX || '',
    // assetPrefix: process.env.NEXT_PUBLIC_PREFIX || '',
    // output: "export",
    // reactStrictMode: true,
    // basePath: '/figma_clone',
    assetPrefix: '/figma_clone',
    output: "export",
    reactStrictMode: true,

    images: {

        // unoptimized: true,
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
