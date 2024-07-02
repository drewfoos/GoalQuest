import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your other Next.js config options
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
