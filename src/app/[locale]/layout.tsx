import { Colors } from '@/constants';
import PWAProvider from '@/provider/PWA.provider';
import QueryProvider from '@/provider/Query.provider';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Pacifico } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import '../globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const pacifico = Pacifico({
  subsets: ['vietnamese'],
  weight: ['400'],
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'Shippee',
  description: 'Delivery service for everyone',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: Colors.primary,
              },
            }}
          >
            <Toaster />
            <QueryProvider>
              <PWAProvider>{children}</PWAProvider>
            </QueryProvider>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
