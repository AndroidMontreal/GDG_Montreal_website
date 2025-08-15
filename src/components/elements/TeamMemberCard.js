'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const TeamMemberCard = ({ member }) => {
  const { getLocalizedData } = useLanguage();
  return (
    <Link
      href={member.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex hover:text-red-700">

      <div className="flex flex-col">

        <div
          className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"> {/* Fixed aspect ratio container */}
          <Image
            src={member.image}
            alt={`${member.name}'s avatar`}
            height={500}
            width={500}
            className="rounded-2xl aspect-square object-cover shadow-lg group-hover:shadow-xl group-hover:scale-105 transition"
          />
        </div>

        <div className="w-full py-6 text-start ">
          <h3 className="text-2xl font-semibold text-gray-800 py-1 group-hover:text-gray-500">{member.name}</h3>
          <p className="text-gray-600 group-hover:text-gray-500">{getLocalizedData(member.title)}</p>
        </div>

      </div>
    </Link>
  );
};

export default TeamMemberCard;
