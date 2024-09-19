/** @type {import('next').NextConfig} */
const nextConfig = {

  // Dinamik veriler 30 saniye boyunca önbellekte tutulur, bu süre geçtikten sonra veri eski kabul edilir ve yeni veri alınır.
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages : ["@node-rs/argon2"]
};

export default nextConfig;
