/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  basePath: isProd ? "/telemedicine" : "",
  assetPrefix: isProd ? "/telemedicine/" : "",
};

export default nextConfig;
