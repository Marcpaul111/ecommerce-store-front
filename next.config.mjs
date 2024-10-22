/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
            {
                protocol: "https",
                hostname: "ygdledjogeajmzgkcezr.supabase.co",
            },

        ]
    },
    eslint: {
        // Disable ESLint during production builds
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
