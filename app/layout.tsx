import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Tilt_Neon } from 'next/font/google';
import { CartProvider } from '@/lib/context/cart-context';
import Marquee from '@/components/layout/marquee';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { STORE_CONFIG } from '@/config/store';
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
  title: 'Untouchable Deals | Authentic Sneakers Lancaster PA, Below Retail, Verified',
  description: 'Authentic Jordan, Nike, and Adidas sneakers in Lancaster, PA. Every pair verified or your money back. New inventory weekly, always below retail. Free local pickup and delivery.',
  keywords: ['authentic sneakers Lancaster PA', 'Jordan retros for sale', 'sneakers below retail', 'verified authentic sneakers', 'streetwear Lancaster PA', 'sneaker resale'],
  openGraph: {
    title: 'Untouchable Deals | Authentic Sneakers, Verified & Below Retail',
    description: 'Every pair verified authentic or your money back. New inventory weekly. Lancaster, PA, free local pickup and delivery.',
    images: [
      {
        url: '/images/untouchable_logo.png',
        width: 1536,
        height: 1024,
        alt: 'Untouchable Deals',
      },
    ],
    siteName: 'Untouchable Deals',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Untouchable Deals | Authentic Sneakers, Verified & Below Retail',
    description: 'Every pair verified authentic or your money back. Lancaster, PA.',
    images: ['/images/untouchable_logo.png'],
  },
  icons: {
    icon: '/images/untouchable_logo.png',
    apple: '/images/untouchable_logo.png',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'SportingGoodsStore',
  name: STORE_CONFIG.name,
  description: 'Authentic Jordan, Nike, and Adidas sneakers, verified before every sale and priced below retail.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: STORE_CONFIG.location.split(',')[0]?.trim(),
    addressRegion: STORE_CONFIG.location.split(',')[1]?.trim(),
    addressCountry: 'US',
  },
  telephone: STORE_CONFIG.phone,
  priceRange: '$$',
  sameAs: [`https://instagram.com/${STORE_CONFIG.instagram.replace('@', '')}`],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tiltNeon.variable} font-sans antialiased bg-black text-white`}
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
