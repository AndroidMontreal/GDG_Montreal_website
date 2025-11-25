import { NextResponse } from 'next/server';

// GDG Chapter endpoints with chapter information
const CHAPTER_ENDPOINTS = [
  { 
    url: 'https://gdg.community.dev/api/chapter/954/event/', 
    chapterName: 'GDG Montreal',
    chapterId: 954 
  },
  { 
    url: 'https://gdg.community.dev/api/chapter/281/event/', 
    chapterName: 'GDG Cloud Montreal',
    chapterId: 281 
  },
  { 
    url: 'https://gdg.community.dev/api/event_slim/for_chapter/954/?status=Live&include_cohosted_events=true',
    chapterName: 'GDG Montreal',
    chapterId: 954 
  },
  { 
    url: 'https://gdg.community.dev/api/event_slim/for_chapter/281/?status=Live&include_cohosted_events=true',
    chapterName: 'GDG Cloud Montreal',
    chapterId: 281 
  },
];

export async function GET() {
  try {
    // Fetch fresh data from all chapter endpoints on every request
    const fetchPromises = CHAPTER_ENDPOINTS.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'GDG-Montreal-Website/1.0'
          }
        });

        if (!response.ok) {
          console.warn(`Failed to fetch from ${endpoint.url}: ${response.status} ${response.statusText}`);
          return { results: [], chapterInfo: endpoint };
        }

        const data = await response.json();
        return { ...data, chapterInfo: endpoint };
      } catch (error) {
        console.warn(`Error fetching from ${endpoint.url}:`, error);
        return { results: [], chapterInfo: endpoint };
      }
    });

    // Wait for all requests to complete
    const responses = await Promise.all(fetchPromises);

    // Combine all events from different chapters
    const allEvents = responses.reduce((acc, response) => {
      if (response.results && Array.isArray(response.results)) {
        // Add chapter information to each event
        const eventsWithChapter = response.results.map(event => ({
          ...event,
          chapterName: response.chapterInfo.chapterName,
          chapterId: response.chapterInfo.chapterId
        }));
        return [...acc, ...eventsWithChapter];
      }
      return acc;
    }, []);

    // Remove duplicates based on event ID
    const uniqueEvents = allEvents.filter((event, index, self) =>
      index === self.findIndex(e => e.id === event.id)
    );

    // Sort events by start date (most recent first)
    uniqueEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    const combinedData = {
      count: uniqueEvents.length,
      results: uniqueEvents,
      pagination: {
        current_page: 1,
        page_size: uniqueEvents.length,
        previous_page: null,
        next_page: null
      },
      links: {
        next: null,
        previous: null
      }
    };

    // Return with cache control headers to prevent browser caching
    return NextResponse.json(combinedData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching events:', error);

    // Return an error response
    return NextResponse.json(
      { error: 'Failed to fetch events', results: [] },
      { status: 500 }
    );
  }
}
