'use client';
import { useState, useEffect } from 'react';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import EventCard from '@/components/elements/EventCard';
import { useLanguage } from '@/contexts/LanguageContext';

const eventsSection = {
  en: {
    title: "Events",
    subtitle: "Discover upcoming and past events organized by GDG Montreal. Join us for workshops, meetups, and conferences to connect with the tech community.",
    upcoming: "Upcoming Events",
    past: "Past Events",
    noEvents: "No events found."
  },
  fr: {
    title: "Événements",
    subtitle: "Découvrez les événements à venir et passés organisés par GDG Montréal. Rejoignez-nous pour des ateliers, des rencontres et des conférences pour vous connecter avec la communauté tech.",
    upcoming: "Événements à venir",
    past: "Événements passés",
    noEvents: "Aucun événement trouvé."
  }
};

export default function Events() {
  const { language } = useLanguage();
  const content = eventsSection[language];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const now = new Date();
  const publishedEvents = events.filter(event => event.status === 'Published');
  const upcomingEvents = publishedEvents
    .filter(event => new Date(event.start_date) > now)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date)); // Sort ascending (closest first)
  const pastEvents = publishedEvents.filter(event => new Date(event.start_date) <= now);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 text-center items-center justify-center my-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 text-center items-center justify-center my-24">
        <p className="text-red-600">Error loading events: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-center items-center justify-center my-24">
      <TitleWithSubtitle
        title={content.title}
        subTitle={content.subtitle}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl"
      />

      {/* Upcoming Events */}
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.upcoming}</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mb-12">{content.noEvents}</p>
        )}
      </div>

      {/* Past Events */}
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{content.past}</h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.slice(0, 12).map(event => (
              <EventCard key={event.id} event={event} isPast={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">{content.noEvents}</p>
        )}
      </div>
    </div>
  );
}