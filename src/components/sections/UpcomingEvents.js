'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import TitleWithSubtitle from '@/components/elements/TitleWithSubtitle';
import EventCard from '@/components/elements/EventCard';
import { useLanguage } from '@/contexts/LanguageContext';

const upcomingEventsSection = {
  en: {
    title: "Upcoming Events",
    subtitle: "Join us for our next events and connect with the Montreal tech community.",
    viewAll: "View All Events",
    noEvents: "No upcoming events at the moment. Check back soon!"
  },
  fr: {
    title: "Événements à venir",
    subtitle: "Rejoignez-nous pour nos prochains événements et connectez-vous avec la communauté tech de Montréal.",
    viewAll: "Voir tous les événements",
    noEvents: "Aucun événement à venir pour le moment. Revenez bientôt !"
  }
};

export default function UpcomingEvents() {
  const { language } = useLanguage();
  const content = upcomingEventsSection[language];
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
  const upcomingEvents = events
    .filter(event => event.status === 'Published' && new Date(event.start_date) > now)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, 3); // Show only the next 3 events

  if (loading) {
    return (
      <div className="flex flex-col gap-6 text-center items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p>Loading upcoming events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 text-center items-center justify-center py-12">
        <TitleWithSubtitle
          title={content.title}
          subTitle={content.subtitle}
          titleClassName="max-w-2xl"
          subTitleClassName="max-w-xl"
        />
        <p className="text-red-600">Error loading events: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-center items-center justify-center">
      <TitleWithSubtitle
        title={content.title}
        subTitle={content.subtitle}
        titleClassName="max-w-2xl"
        subTitleClassName="max-w-xl"
      />

      {upcomingEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {content.viewAll} →
          </Link>
        </>
      ) : (
        <div className="py-12">
          <p className="text-gray-600 text-lg">{content.noEvents}</p>
          <Link
            href="/events"
            className="inline-flex items-center px-6 py-3 mt-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {content.viewAll} →
          </Link>
        </div>
      )}
    </div>
  );
}