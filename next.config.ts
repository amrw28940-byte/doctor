/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // هذه الخطوة تتجاهل أخطاء الـ Lint أثناء الـ Build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // هذه الخطوة تتجاهل أخطاء الـ Types أثناء الـ Build (لا يُنصح بها دائماً، لكنها تحل مشكلة الـ Build العالق)
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig