import MeetupHeader from '@/components/sections/MeetupHeader';
import Communities from '@/components/sections/Communities';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import SpecialEvents from '@/components/sections/SpecialEvents';
import EventPhotos from '@/components/sections/EventPhotos';

export default function Home() {
  return (
    <div className="flex flex-col justify-around gap-20">
      <section id="home" className="scroll-mt-20">
        <MeetupHeader />
      </section>
      <section id="communities" className="scroll-mt-20">
        <Communities />
      </section>
      <section id="upcoming-events" className="scroll-mt-20">
        <UpcomingEvents />
      </section>
      <section id="events" className="scroll-mt-20">
        <SpecialEvents />
      </section>
      <section id="photos" className="scroll-mt-20">
        <EventPhotos />
      </section>
    </div>
  );
}
