'use client';
import Image from 'next/image';
import { CalendarDaysIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import PillButton from '@/components/elements/PillButton';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { specialEventsSection, specialEvents } from '@/data/specialEventsData';
import { v4 as uuidv4 } from 'uuid';

const SpecialEvents = () => {
  const { getLocalizedData, language } = useLanguage();
  const data = specialEventsSection[language];
  const featuredEvent = specialEvents.find(event => event.featured);
  const otherEvents = specialEvents.filter(event => !event.featured);

  const getStatusColor = (status) => {
    switch (status) {
      case 'registration-open':
        return 'bg-green-100 text-green-800';
      case 'sold-out':
        return 'bg-red-100 text-red-800';
      case 'coming-soon':
        return 'bg-blue-100 text-blue-800';
      case 'past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'registration-open':
        return 'Registration Open';
      case 'sold-out':
        return 'Sold Out';
      case 'coming-soon':
        return 'Coming Soon';
      case 'past':
        return 'Past Event';
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col gap-12 my-10">
      <TitleWithSubtitle
        title={data.title}
        subTitle={data.subtitle}
        titleClassName="max-w-xl"
        subTitleClassName="max-w-lg"
      />

      {featuredEvent && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(featuredEvent.status)}`}>
                  {getStatusText(featuredEvent.status)}
                </span>
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600 font-medium">Featured Event</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{featuredEvent.name}</h3>
              <p className="text-lg text-blue-700 font-medium mb-4">{getLocalizedData(featuredEvent.tagline)}</p>
              <p className="text-gray-600 mb-6">{getLocalizedData(featuredEvent.description)}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <CalendarDaysIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">{getLocalizedData(featuredEvent.date)}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{getLocalizedData(featuredEvent.location)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {getLocalizedData(featuredEvent.highlights).map((highlight) => (
                  <div key={uuidv4()} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {highlight}
                  </div>
                ))}
              </div>
              
              <PillButton
                href={featuredEvent.ctaLink}
                label={getLocalizedData(featuredEvent.ctaText)}
                className="inline-flex"
              />
            </div>
            
            <div className="flex-shrink-0">
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.name}
                width={400}
                height={300}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {otherEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {getStatusText(event.status)}
                </span>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h4>
              <p className="text-blue-600 font-medium mb-3">{getLocalizedData(event.tagline)}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{getLocalizedData(event.description)}</p>
              
              <div className="flex flex-col gap-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 mr-2" />
                  {getLocalizedData(event.date)}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {getLocalizedData(event.location)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {getLocalizedData(event.highlights).slice(0, 4).map((highlight) => (
                  <div key={uuidv4()} className="flex items-center text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {highlight}
                  </div>
                ))}
              </div>
              
              <PillButton
                href={event.ctaLink}
                label={getLocalizedData(event.ctaText)}
                className="w-full text-center text-sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialEvents;