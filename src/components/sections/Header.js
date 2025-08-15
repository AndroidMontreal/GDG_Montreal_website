'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/elements/Navbar';
import MobileDrawer from '@/components/elements/MobileDrawer';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import PillButton from '@/components/elements/PillButton';
import LanguageSwitcher from '@/components/elements/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import headerConfig from '@/data/header.json';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 mt-0 px-3">
      <div className="bg-white container mx-auto flex items-center justify-between pt-5">
        <div className="bg-gray-100 container mx-auto flex items-center justify-between p-5 rounded-2xl">

          {/* Logo and other elements on the left */}
          <Link href={headerConfig.logo.href}>
            <Image
              src={headerConfig.logo.src}
              width={headerConfig.logo.width}
              height={headerConfig.logo.height}
              alt={headerConfig.logo.alt[language]}
              priority={true}
            />
          </Link>

          <div className="flex flex-row items-center gap-4">
            {/* Navigation (Desktop) on the right */}
            <Navbar isMobile={false} />
            <LanguageSwitcher className="hidden md:flex" />
            <PillButton className="ml-3 hidden md:flex" href={headerConfig.cta.href}
                        label={headerConfig.cta.label[language]} />

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
