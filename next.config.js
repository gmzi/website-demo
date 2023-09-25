/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['res.cloudinary.com'],
    }, 
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
