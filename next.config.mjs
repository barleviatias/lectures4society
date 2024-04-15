/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'files.edgestore.dev',
            port: '',
            pathname: '/adnljg3dv8j7nydf/publicFiles/**',
          },
        ],
      },
};

export default nextConfig;
