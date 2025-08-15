'use client';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { team, teamSection } from '@/data/teamData';
import TeamMemberCard from '@/components/elements/TeamMemberCard';
import { sortTeamByFirstName } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  const content = teamSection[language];
  const sortedTeam = sortTeamByFirstName(team); // Use the imported function

  return (
    <div id="speakers" className="flex flex-col gap-6 text-center items-center justify-center my-24">
      <TitleWithSubtitle
        title={content.title}
        subTitle={content.subtitle}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl" />

      <ul className=" py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sortedTeam.map(member => (
          <li key={uuidv4()} className="flex items-start">
            <TeamMemberCard member={member} />
          </li>
        ))}
      </ul>

    </div>
  );
}
