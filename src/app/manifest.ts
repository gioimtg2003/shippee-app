export default function manifest() {
  return {
    display: 'standalone',
    name: 'Shippee',
    short_name: 'shippee',
    description:
      'Shippee is a shipping company that delivers your packages on time.',
    theme_color: '#6366f1',
    background_color: '#4292f3',
    icons: [
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: 'icon512_maskable.png',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: 'icon512_rounded.png',
        type: 'image/png',
      },
    ],
    orientation: 'any',
    dir: 'auto',
    lang: 'vi',
    start_url: '/',
    scope: '/',
    screenshots: [
      {
        src: 'screenshot1.png',
        sizes: '991x685',
        type: 'image/png',
      },
      {
        src: 'screenshot1.png',
        sizes: '991x685',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  };
}
