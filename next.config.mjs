/** @type {import('next').NextConfig} */
const nextConfig = {

    basePath: "/figma_clone",
    assetPrefix: "/figma_clone",
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
