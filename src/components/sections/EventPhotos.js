'use client';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { eventPhotos, eventPhotosContent } from '@/data/eventPhotosData';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import PillButton from '@/components/elements/PillButton';
import { useLanguage } from '@/contexts/LanguageContext';


const EventPhotos = () => {
  const { language } = useLanguage();
  const content = eventPhotosContent[language];

  return (
    <div className="flex flex-col gap-8 text-center items-center justify-center my-10">
      <TitleWithSubtitle
        title={content.title}
        subTitle={content.subTitle}
        titleClassName="max-w-4xl"
        subTitleClassName="max-w-xl" />
      <div
        className="columns-1 gap-6 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-3 [&>img:not(:first-child)]:mt-8 place-items-center place-content-center"
      >
        {eventPhotos.map((eventPhoto) => {
          return (
            <Image
              key={uuidv4()}
              src={eventPhoto.image}
              alt={eventPhoto.title}
              className="rounded-2xl mt-6 bg-white w-auto"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
            />
          );

        })}
      </div>
    </div>
  );
};

export default EventPhotos;
