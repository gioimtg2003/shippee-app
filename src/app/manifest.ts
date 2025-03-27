import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    display: 'standalone',
    name: 'Shippee',
    short_name: 'shippee',
    description:
      'Shippee is a shipping company that delivers your packages on time.',
    start_url: '/',
    scope: '/',
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
    icons: [
      {
        sizes: '512x512',
        src: 'favicon.png',
        type: 'image/png',
      },
    ],
  };
}
