import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Tilt_Neon } from 'next/font/google';
import { CartProvider } from '@/lib/context/cart-context';
import Marquee from '@/components/layout/marquee';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import './globals.css';

const tiltNeon = Tilt_Neon({
  subsets: ['latin'],
  variable: '--font-tilt-neon',
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://untouchableempire.netlify.app'),
  title: 'Untouchable Empire | Authentic Sneakers & Premium Products',
  description: 'Premium products, personal service, powerful results. Authentic sneakers, electronics, apparel and more. Local pickup and delivery available. Fast. Reliable. Untouchable.',
  openGraph: {
    title: 'Untouchable Empire | Authentic Sneakers & Premium Products',
    description: 'Brand new kicks at unbeatable prices. Authentic sneakers, electronics, apparel and more. Lancaster, PA.',
    images: [
      {
        url: '/images/untouchable_logo.png',
        width: 1536,
        height: 1024,
        alt: 'Untouchable Empire',
      },
    ],
    siteName: 'Untouchable Empire',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Untouchable Empire | Authentic Sneakers & Premium Products',
    description: 'Brand new kicks at unbeatable prices. Lancaster, PA.',
    images: ['/images/untouchable_logo.png'],
  },
  icons: {
    icon: '/images/untouchable_logo.png',
    apple: '/images/untouchable_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiltNeon.variable} antialiased bg-black text-white`}
      >
        <CartProvider>
          <Marquee />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
