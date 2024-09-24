/** @type {import('next').NextConfig} */
const nextConfig = {

  // Dinamik veriler 30 saniye boyunca önbellekte tutulur, bu süre geçtikten sonra veri eski kabul edilir ve yeni veri alınır.
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages : ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },
};

export default nextConfig;
