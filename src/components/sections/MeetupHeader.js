'use client';
import Image from 'next/image';
import PillButton from '@/components/elements/PillButton';
import { useLanguage } from '@/contexts/LanguageContext';
import headerData from '@/data/headerData.js';

const MeetupHeader = () => {
  const { language } = useLanguage();
  const data = headerData[language];

  return (
    <div className="flex flex-col">
      <h1 className="text-[min(12vw,60px)] leading-[1.3] tracking-tighter font-bold pt-14 pb-8 text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-700 md:text-center">
        {data.title}
      </h1>

      <div className="container mx-auto flex flex-col items-start xl:items-center lg:flex-row justify-evenly gap-9">
        <div>
          <Image
            className="rounded-xl shadow-xl"
            src="/images/logo/GDG-Montreal.png"
            alt="GDG Montreal Community"
            width={600}
            height={400}
          />
        </div>
        <div className="mb-6 md:mb-0 text-left md:text-left">
          <p className="text-gray-600 max-w-xl mb-6">
            {data.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
            {data.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-semibold text-gray-900">{stat.title}</span>
                <span className="text-gray-600">{stat.subtitle}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <PillButton
              className="flex"
              href={data.cta.primary.href}
              label={data.cta.primary.text}
            />
            <PillButton
              className="flex"
              href={data.cta.secondary.href}
              label={data.cta.secondary.text}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupHeader;
