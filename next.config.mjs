/* eslint-disable prettier/prettier */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'media-shippee.nguyenconggioi.tech',
                protocol: 'https',
                port: '',
                pathname: '/**',
            }
        ],
    }
};

export default withNextIntl(nextConfig);
