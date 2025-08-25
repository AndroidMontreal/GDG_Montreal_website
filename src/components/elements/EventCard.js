'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const EventCard = ({ event, isPast = false }) => {
  const { language } = useLanguage();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', options);
  };


  return (
    <Link
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full border-l-4 ${
        isPast ? 'border-gray-400 opacity-75' : 'border-blue-500'
      }`}>
        {isPast && (
          <div className="flex justify-end mb-3">
            <span className="text-xs text-gray-500 font-medium">
              {language === 'fr' ? 'Événement passé' : 'Past Event'}
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">
              {language === 'fr' ? 'Début:' : 'Start:'}
            </span>
            <p className="mt-1">{formatDate(event.start_date)}</p>
          </div>
          
          {event.end_date && (
            <div>
              <span className="font-medium">
                {language === 'fr' ? 'Fin:' : 'End:'}
              </span>
              <p className="mt-1">{formatDate(event.end_date)}</p>
            </div>
          )}
        </div>
        
        {event.chapterName && (
          <div className="mt-3">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              {event.chapterName}
            </span>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-blue-600 group-hover:text-blue-800 font-medium">
            {language === 'fr' ? 'Voir les détails →' : 'View Details →'}
          </span>
          
          {event.allows_cohosting && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {language === 'fr' ? 'Co-organisé' : 'Co-hosted'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;