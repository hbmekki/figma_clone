/** @type {import('next').NextConfig} */
const nextConfig = {

    basePath: "/figma_clone",
    output: "export",
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'liveblocks.io',
                port: ''
            }
        ]
    }
};

export default nextConfig;
