/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
            {
                protocol: "https",
                hostname: "ygdledjogeajmzgkcezr.supabase.co",
            },
            {
                protocol: "https",
                hostname: "ecommerce-admin-git-main-codebility.vercel.app",
            },

        ]
    },
    eslint: {
        // Disable ESLint during production builds
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
