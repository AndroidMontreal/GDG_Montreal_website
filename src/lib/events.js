// The site is a static export hosted on GitHub Pages, so there is no server to
// proxy these requests. The GDG community API allows CORS, so events are
// fetched directly from the browser to always show the latest data.
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

async function fetchChapterEvents(endpoint) {
  try {
    const response = await fetch(endpoint.url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn(`Failed to fetch from ${endpoint.url}: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return (data.results || []).map(event => ({
      ...event,
      chapterName: endpoint.chapterName,
      chapterId: endpoint.chapterId
    }));
  } catch (error) {
    console.warn(`Error fetching from ${endpoint.url}:`, error);
    return [];
  }
}

// Returns events from all chapters, deduplicated and sorted most recent first.
export async function fetchEvents() {
  const responses = await Promise.all(CHAPTER_ENDPOINTS.map(fetchChapterEvents));
  const allEvents = responses.flat();

  if (allEvents.length === 0) {
    throw new Error('Failed to fetch events');
  }

  const uniqueEvents = allEvents.filter((event, index, self) =>
    index === self.findIndex(e => e.id === event.id)
  );

  return uniqueEvents.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
}
