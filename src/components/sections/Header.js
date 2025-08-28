'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/elements/Navbar';
import MobileDrawer from '@/components/elements/MobileDrawer';
import { useState, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import PillButton from '@/components/elements/PillButton';
import LanguageSwitcher from '@/components/elements/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { headerConfig } from '@/data/headerConfig';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [useSmallLogo, setUseSmallLogo] = useState(false);
  const { language } = useLanguage();
  const headerRef = useRef(null);

  useEffect(() => {
    const checkHeaderFit = () => {
      if (headerRef.current) {
        const headerWidth = headerRef.current.offsetWidth;

        // Switch to small logo when header is getting tight
        // This threshold can be adjusted based on when overflow starts happening
        const shouldUseSmallLogo = headerWidth < 1200 && headerWidth > 700; // Adjust this value as needed

        setUseSmallLogo(shouldUseSmallLogo);
      }
    };

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(checkHeaderFit);

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    // Initial check
    checkHeaderFit();

    return () => {
      resizeObserver.disconnect();
    };
  }, [language]);

  return (
    <header className="sticky top-0 z-50 mt-0 px-3">
      <div className="bg-white container mx-auto flex items-center justify-between pt-5">
        <div ref={headerRef} className="bg-gray-100 container mx-auto flex items-center justify-between p-5 rounded-2xl">

          {/* Logo - switches to small version when space is tight */}
          <Link href={headerConfig.logo.href} className="flex-shrink-0 min-w-0 pr-6">
            <Image
              src={useSmallLogo ? headerConfig.smallLogo.src : headerConfig.logo.src}
              width={useSmallLogo ? headerConfig.smallLogo.width : headerConfig.logo.width}
              height={useSmallLogo ? headerConfig.smallLogo.height : headerConfig.logo.height}
              alt={headerConfig.logo.alt[language]}
              priority={true}
              className="max-w-full h-auto object-contain"
            />
          </Link>

          <div className="flex flex-row items-center gap-4">
            {/* Navigation (Desktop) on the right */}
            <Navbar isMobile={false} />
            <LanguageSwitcher className="hidden md:flex" />
            {useSmallLogo ? (
              <a
                href={headerConfig.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex p-2 hover:bg-gray-200 rounded-full"
                aria-label={headerConfig.compactIcon.ariaLabel[language]}
              >
                <headerConfig.compactIcon.component className={headerConfig.compactIcon.className} />
              </a>
            ) : (
              <PillButton className="ml-3 hidden md:flex" href={headerConfig.cta.href}
                          label={headerConfig.cta.label[language]} />
            )}

          </div>
          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-gray-800 hover:text-black focus:outline-none p-2 hover:bg-gray-200 rounded-full"
            onClick={() => setIsMenuOpen(true)} role="button" aria-label={headerConfig.mobileMenu.ariaLabel[language]} aria-pressed="false"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

        </div>


        {/*App Drawer overlay background*/}
        {isMenuOpen && <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-40"
          onClick={() => setIsMenuOpen(false)}
        >

        </div>}

        {/* App Drawer (Mobile) */}
        <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
