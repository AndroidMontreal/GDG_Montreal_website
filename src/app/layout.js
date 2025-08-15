import GoogleAnalytics from '@/lib/GoogleAnalytics';
import '@/styles/globals.css';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { siteData } from '@/data/siteData';

const openSans = Open_Sans({
  weight: ['400', '700'], // Include the font weights you'll use
  style: 'normal', // or italic
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  metadataBase: new URL(siteData.site.en.baseUrl),
  title: siteData.site.en.title,
  description: siteData.site.en.description,
  openGraph: {
    images: ['/images/logo/gdg_montreal.png'],
  }
};

export default function RootLayout({ children }) {
  return (<html lang="en">
    <body className={openSans.className}>
      <LanguageProvider>
        <Header />
        <main className="container flex mx-auto px-5 flex-col flex-grow"> {/* Allow main content to expand */}
          {children}
        </main>
        <Footer />
        <GoogleAnalytics />
      </LanguageProvider>
    </body>
  </html>
  );
}
