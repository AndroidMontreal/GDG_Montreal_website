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

          {member.teams && member.teams.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {member.teams.map((team, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    team === 'GDG Montreal'
                      ? 'text-red-900'
                      : team === 'Flutter Montreal'
                      ? 'text-blue-800'
                      : team === 'Android Montreal'
                      ? 'text-green-900'
                      : team === 'Women Techmakers'
                      ? 'text-blue-900'
                      : team === 'GDG Cloud Montreal'
                      ? 'text-blue-900'
                      : 'bg-gray-100 text-gray-800'

                  }`}
                  style={
                    team === 'Women Techmakers'
                      ? { backgroundColor: '#3089f680' }
                      : team === 'GDG Cloud Montreal'
                      ? { backgroundColor: '#3089f680' }
                      : team == 'Android Montreal'
                      ? { backgroundColor: '#089e5180'}
                      : team == 'GDG Montreal'
                      ? { backgroundColor: '#f5363b80'}
                      : team == 'Flutter Montreal'
                      ? { backgroundColor: '#50cdfc80'}
                      : undefined
                  }
                >
                  {team}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </Link>
  );
};

export default TeamMemberCard;
