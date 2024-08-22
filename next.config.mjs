/** @type {import('next').NextConfig} */
const nextConfig = {

    basePath: process.env.NEXT_PUBLIC_PREFIX || '',
    assetPrefix: process.env.NEXT_PUBLIC_PREFIX || '',
    output: "export",
    // reactStrictMode: true,

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
