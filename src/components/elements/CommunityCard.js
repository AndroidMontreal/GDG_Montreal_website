import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaLinkedin, FaYoutube, FaSpotify } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { communityCardText } from '@/data/communitiesData';

const CommunityCard = ({ communities }) => {
  const { getLocalizedData, language } = useLanguage();
  const buttonText = communityCardText[language];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {communities.map((meetup) => (
          <div
            key={uuidv4()}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
          >
            <div className="flex-grow">
              <div className="flex items-center mb-4">
                <Image
                  className="h-16 w-auto object-contain"
                  src={meetup.logo}
                  alt={meetup.name}
                  width={64}
                  height={64}
                />
                <h3 className="ml-4 text-lg font-semibold text-gray-900">{meetup.name}</h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{getLocalizedData(meetup.description)}</p>

              {meetup.nextEvent && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Next Event</h4>
                  <p className="text-sm font-medium text-gray-800 mb-1">{getLocalizedData(meetup.nextEvent.title)}</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-xs text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {meetup.nextEvent.date}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {getLocalizedData(meetup.nextEvent.location)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            {(meetup.instagram || meetup.linkedin || meetup.youtube) && (
              <div className="flex justify-center gap-4 mb-4">
                {meetup.instagram && (
                  <a
                    href={meetup.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                )}
                {meetup.linkedin && (
                  <a
                    href={meetup.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                )}
                {meetup.youtube && (
                  <a
                    href={meetup.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                )}
                {meetup.spotify && (
                  <a
                    href={meetup.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FaSpotify className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <a
                href={meetup.website}
                className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {buttonText.learnMore}
              </a>
              <a
                href={meetup.meetupUrl}
                className="flex-1 text-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                {buttonText.joinMeetup}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCard;
