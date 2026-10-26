import { team as localTeam } from '@/data/teamData';

// Organizers are fetched from the GDG community API (which allows CORS) so the
// team stays in sync with the chapter pages. Entries in teamData.js add the
// display name, link and badges, and members only listed locally are kept.
const CHAPTER_TEAM_ENDPOINTS = [
  {
    url: 'https://gdg.community.dev/api/chapter_slim/gdg-montreal/team/',
    chapterName: 'GDG Montreal'
  },
  {
    url: 'https://gdg.community.dev/api/chapter_slim/gdg-cloud-montreal/team/',
    chapterName: 'GDG Cloud Montreal'
  },
];

// "Dr. Stefania Pecore" and "Stefania Pecore", or "Jhin LEE" and "Jhin Lee",
// refer to the same person.
function normalizeName(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^dr\.?\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchChapterTeam(endpoint) {
  try {
    const response = await fetch(endpoint.url, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn(`Failed to fetch from ${endpoint.url}: ${response.status} ${response.statusText}`);
      return [];
    }

    const members = await response.json();
    return members.map(member => ({ ...member.user, chapterName: endpoint.chapterName }));
  } catch (error) {
    console.warn(`Error fetching from ${endpoint.url}:`, error);
    return [];
  }
}

function toTeamMember(user, chapterNames, localMember) {
  const jobTitle = [user.title, user.company].filter(Boolean).join(' @ ');

  return {
    name: localMember?.name || user.full_name,
    title: jobTitle || localMember?.title,
    image: user.cropped_avatar_url || localMember?.image,
    link: localMember?.link || `https://gdg.community.dev${user.profile_url}`,
    teams: localMember?.teams || chapterNames,
  };
}

// Returns the organizers from all chapters merged with the local team data.
export async function fetchTeam() {
  const responses = await Promise.all(CHAPTER_TEAM_ENDPOINTS.map(fetchChapterTeam));
  const users = responses.flat();

  if (users.length === 0) {
    throw new Error('Failed to fetch team');
  }

  const localByName = new Map(localTeam.map(member => [normalizeName(member.name), member]));
  const usersByName = new Map();

  users.forEach(user => {
    const key = normalizeName(user.full_name);
    const existing = usersByName.get(key);
    if (existing) {
      existing.chapterNames.push(user.chapterName);
    } else {
      usersByName.set(key, { user, chapterNames: [user.chapterName] });
    }
  });

  const remoteMembers = [...usersByName].map(([key, { user, chapterNames }]) =>
    toTeamMember(user, chapterNames, localByName.get(key))
  );
  const localOnlyMembers = localTeam.filter(member => !usersByName.has(normalizeName(member.name)));

  return [...remoteMembers, ...localOnlyMembers];
}
