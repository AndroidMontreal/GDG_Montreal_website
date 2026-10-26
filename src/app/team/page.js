'use client';
import { useState, useEffect } from 'react';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { team, teamSection } from '@/data/teamData';
import TeamMemberCard from '@/components/elements/TeamMemberCard';
import { sortTeamByFirstName } from '@/lib/utils';
import { fetchTeam } from '@/lib/team';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const content = teamSection[language];
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        setMembers(await fetchTeam());
      } catch (err) {
        // Fall back to the local team data if the GDG API is unavailable
        setMembers([...team]);
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, []);

  const sortedTeam = sortTeamByFirstName(members);

  return (
    <div id="speakers" className="flex flex-col gap-6 text-center items-center justify-center my-24">
      <TitleWithSubtitle
        title={content.title}
        subTitle={content.subtitle}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl" />

      {loading ? (
        <div className="py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <ul className=" py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sortedTeam.map(member => (
            <li key={uuidv4()} className="flex items-start">
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
