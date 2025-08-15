'use client';
import CommunityCard from '@/components/elements/CommunityCard';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { communitiesSection, meetupGroups } from '@/data/communitiesData';

const Communities = () => {
  const { language } = useLanguage();
  const data = communitiesSection[language];
  
  return (
    <div className="flex flex-col gap-6 text-center items-center justify-center my-10">
      <TitleWithSubtitle
        title={data.title}
        subTitle={data.subtitle}
        titleClassName="max-w-xl"
        subTitleClassName="max-w-lg" />
      <CommunityCard communities={meetupGroups} />
    </div>
  );
};

export default Communities;
