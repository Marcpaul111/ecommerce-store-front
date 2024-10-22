/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          
            {
                protocol: "https",
                hostname: "ygdledjogeajmzgkcezr.supabase.co",
            },

        ]
    }
};

export default nextConfig;
