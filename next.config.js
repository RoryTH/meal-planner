/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: '**.gousto.co.uk'
            }
        ]
    }
};
