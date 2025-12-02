
import { NavItem, Fixture, NewsItem, TableRow, Team } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Fixtures', path: '/fixtures' },
  { label: 'Tables', path: '/tables' },
  { label: 'Clubs', path: '/clubs' },
  { label: 'Contact', path: '/contact' },
];

export const PITCH_STATUS = 'ON'; // 'ON' or 'OFF'

// Helper to generate Google Maps Search Link for venues
export const getVenueMapLink = (venueName: string) => {
  // Appending ", Wicklow" helps Google Maps narrow down the search to the local area
  const query = encodeURIComponent(`${venueName}, Wicklow, Ireland`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

// Added colors (Hex codes) for vector generation
export const CLUBS: Team[] = [
  { id: '1', name: 'Arklow Town', shortName: 'ARK', colors: ['#000000', '#FFFFFF'] }, // Black/White
  { id: '2', name: 'Wicklow Rovers', shortName: 'WIC', colors: ['#16a34a', '#FFFFFF'] }, // Green/White
  { id: '3', name: 'Ashford Rovers', shortName: 'ASH', colors: ['#2563eb', '#FFFFFF'] }, // Blue/White
  { id: '4', name: 'Newtown Juniors', shortName: 'NEW', colors: ['#dc2626', '#000000'] }, // Red/Black
  { id: '5', name: 'St. Patricks', shortName: 'STP', colors: ['#15803d', '#facc15'] }, // Green/Yellow (Avoca)
  { id: '6', name: 'Glencormac United', shortName: 'GLE', colors: ['#16a34a', '#facc15'] }, // Green/Yellow
  { id: '7', name: 'Roundwood AFC', shortName: 'RND', colors: ['#16a34a', '#FFFFFF'] }, // Green/White
  { id: '8', name: 'Greystones United', shortName: 'GRE', colors: ['#16a34a', '#FFFFFF'] }, // Green/White
  { id: '9', name: 'Coolboy Rangers', shortName: 'COO', colors: ['#2563eb', '#facc15'] }, // Blue/Yellow
  { id: '10', name: 'Rathnew AFC', shortName: 'RAT', colors: ['#16a34a', '#fbbf24'] }, // Green/Gold
  { id: '11', name: 'Wolfe Tone', shortName: 'WOL', colors: ['#3b82f6', '#FFFFFF'] }, // Blue/White
  { id: '12', name: 'Avonmore', shortName: 'AVO', colors: ['#1e3a8a', '#60a5fa'] }, // Dark Blue/Light Blue
  { id: '13', name: 'Enniskerry YC', shortName: 'ENN', colors: ['#3b82f6', '#FFFFFF'] }, // Blue/White
  { id: '14', name: 'Carnew', shortName: 'CAR', colors: ['#dc2626', '#000000'] }, // Red/Black
  { id: '15', name: 'Aughrim Rangers', shortName: 'AUG', colors: ['#2563eb', '#FFFFFF'] }, // Blue/White
  { id: '16', name: 'Shillelagh', shortName: 'SHI', colors: ['#16a34a', '#fbbf24'] }, // Green/Gold
  { id: '17', name: 'Ardmore Rovers', shortName: 'ARD', colors: ['#000000', '#2563eb'] }, // Black/Blue
  { id: '18', name: 'St. Anthonys', shortName: 'STA', colors: ['#dc2626', '#000000'] }, // Red/Black
  { id: '19', name: 'Kilcoole', shortName: 'KIL', colors: ['#16a34a', '#FFFFFF'] }, // Green/White
  { id: '20', name: 'Arklow United', shortName: 'AKU', colors: ['#000000', '#dc2626'] }, // Black/Red
  { id: '21', name: 'Arklow Celtic', shortName: 'CEL', colors: ['#16a34a', '#60a5fa'] }, // Green/Sky Blue
];

// Helper to access clubs easily
export const getClub = (name: string) => CLUBS.find(c => c.name === name) || CLUBS[0];

// Helper to create dates relative to today
const today = new Date();
const addDays = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

// --- DATA STRUCTURE FOR ALL AGE GROUPS ---
export const LEAGUE_TABLES: Record<string, TableRow[]> = {
  // --- UNDER 8 (Non-Competitive) ---
  'U8 Group A': [
    { position: 1, team: 'Arklow Town A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 2, team: 'Wicklow Rovers A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 3, team: 'Ashford Rovers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 4, team: 'Rathnew AFC', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],
  'U8 Group B': [
    { position: 1, team: 'Greystones United A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 2, team: 'Newtown Juniors', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 3, team: 'St. Anthonys', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 4, team: 'Enniskerry YC', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],

  // --- UNDER 9 ---
  'U9 Group A': [
     { position: 1, team: 'Arklow Town A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 2, team: 'Arklow United', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 3, team: 'Arklow Celtic', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 4, team: 'Coolboy Rangers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],
  'U9 Group B': [
     { position: 1, team: 'Wicklow Rovers A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 2, team: 'Rathnew AFC', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 3, team: 'Ashford Rovers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
     { position: 4, team: 'Glencormac United', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],

  // --- UNDER 10 ---
  'U10 Group A': [
    { position: 1, team: 'Greystones United A', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 2, team: 'Ardmore Rovers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 3, team: 'Enniskerry YC', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 4, team: 'Wolfe Tone', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],
  'U10 Group B': [
    { position: 1, team: 'St. Patricks', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 2, team: 'Avonmore', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 3, team: 'Roundwood AFC', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
    { position: 4, team: 'Aughrim Rangers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],
  
  // --- UNDER 11 ---
  'U11 Group A': [
    { position: 1, team: 'Arklow Town A', played: 5, won: 5, drawn: 0, lost: 0, gd: 15, points: 15 },
    { position: 2, team: 'Wicklow Rovers A', played: 5, won: 4, drawn: 0, lost: 1, gd: 10, points: 12 },
    { position: 3, team: 'Ashford Rovers', played: 5, won: 3, drawn: 0, lost: 2, gd: 5, points: 9 },
    { position: 4, team: 'St. Anthonys', played: 5, won: 2, drawn: 0, lost: 3, gd: -2, points: 6 },
    { position: 5, team: 'Rathnew AFC', played: 5, won: 1, drawn: 0, lost: 4, gd: -8, points: 3 },
  ],
  'U11 Group B': [
    { position: 1, team: 'Greystones United', played: 5, won: 4, drawn: 1, lost: 0, gd: 12, points: 13 },
    { position: 2, team: 'Newtown Juniors', played: 5, won: 3, drawn: 2, lost: 0, gd: 8, points: 11 },
    { position: 3, team: 'Kilcoole', played: 5, won: 2, drawn: 1, lost: 2, gd: 0, points: 7 },
    { position: 4, team: 'Glencormac United', played: 5, won: 1, drawn: 0, lost: 4, gd: -10, points: 3 },
  ],

  // --- UNDER 12 ---
  'U12 Premier': [
    { position: 1, team: 'Arklow Town', played: 12, won: 10, drawn: 1, lost: 1, gd: 28, points: 31 },
    { position: 2, team: 'Wicklow Rovers', played: 12, won: 9, drawn: 2, lost: 1, gd: 24, points: 29 },
    { position: 3, team: 'Ashford Rovers', played: 11, won: 7, drawn: 1, lost: 3, gd: 15, points: 22 },
    { position: 4, team: 'St. Anthonys', played: 12, won: 6, drawn: 2, lost: 4, gd: 8, points: 20 },
    { position: 5, team: 'Greystones United', played: 12, won: 4, drawn: 1, lost: 7, gd: -5, points: 13 },
    { position: 6, team: 'Newtown Juniors', played: 11, won: 2, drawn: 0, lost: 9, gd: -18, points: 6 },
    { position: 7, team: 'Rathnew AFC', played: 12, won: 0, drawn: 1, lost: 11, gd: -35, points: 1 },
  ],
  'U12 Division 1': [
    { position: 1, team: 'Ardmore Rovers', played: 10, won: 8, drawn: 1, lost: 1, gd: 20, points: 25 },
    { position: 2, team: 'Wolfe Tone', played: 10, won: 7, drawn: 2, lost: 1, gd: 18, points: 23 },
    { position: 3, team: 'Coolboy Rangers', played: 9, won: 5, drawn: 1, lost: 3, gd: 5, points: 16 },
    { position: 4, team: 'Glencormac United', played: 10, won: 4, drawn: 1, lost: 5, gd: -2, points: 13 },
    { position: 5, team: 'Enniskerry YC', played: 10, won: 2, drawn: 1, lost: 7, gd: -12, points: 7 },
    { position: 6, team: 'Avonmore', played: 9, won: 0, drawn: 0, lost: 9, gd: -25, points: 0 },
  ],
  'U12 Division 2': [
    { position: 1, team: 'Kilcoole', played: 8, won: 7, drawn: 1, lost: 0, gd: 19, points: 22 },
    { position: 2, team: 'Roundwood AFC', played: 8, won: 5, drawn: 2, lost: 1, gd: 12, points: 17 },
    { position: 3, team: 'Arklow Celtic', played: 8, won: 4, drawn: 1, lost: 3, gd: 4, points: 13 },
    { position: 4, team: 'Shillelagh', played: 7, won: 2, drawn: 1, lost: 4, gd: -6, points: 7 },
    { position: 5, team: 'Carnew', played: 8, won: 1, drawn: 1, lost: 6, gd: -15, points: 4 },
    { position: 6, team: 'Aughrim Rangers', played: 7, won: 0, drawn: 2, lost: 5, gd: -14, points: 2 },
  ],
  'U12 Division 3': [
      { position: 1, team: 'St. Patricks', played: 6, won: 6, drawn: 0, lost: 0, gd: 20, points: 18 },
      { position: 2, team: 'Arklow United', played: 6, won: 4, drawn: 0, lost: 2, gd: 8, points: 12 },
      { position: 3, team: 'Wicklow Rovers B', played: 6, won: 2, drawn: 0, lost: 4, gd: -5, points: 6 },
      { position: 4, team: 'Ashford Rovers B', played: 6, won: 0, drawn: 0, lost: 6, gd: -23, points: 0 },
  ],

  // --- UNDER 13 ---
  'U13 Premier': [
    { position: 1, team: 'Wicklow Rovers', played: 10, won: 9, drawn: 0, lost: 1, gd: 30, points: 27 },
    { position: 2, team: 'Arklow Town', played: 10, won: 7, drawn: 2, lost: 1, gd: 18, points: 23 },
    { position: 3, team: 'St. Patricks', played: 10, won: 6, drawn: 1, lost: 3, gd: 10, points: 19 },
    { position: 4, team: 'Newtown Juniors', played: 10, won: 4, drawn: 1, lost: 5, gd: -2, points: 13 },
    { position: 5, team: 'Greystones United', played: 10, won: 2, drawn: 0, lost: 8, gd: -20, points: 6 },
    { position: 6, team: 'Ashford Rovers', played: 10, won: 0, drawn: 0, lost: 10, gd: -36, points: 0 },
  ],
  'U13 Division 1': [
    { position: 1, team: 'Glencormac United', played: 8, won: 6, drawn: 1, lost: 1, gd: 14, points: 19 },
    { position: 2, team: 'Rathnew AFC', played: 8, won: 5, drawn: 2, lost: 1, gd: 10, points: 17 },
    { position: 3, team: 'Arklow United', played: 8, won: 4, drawn: 0, lost: 4, gd: 2, points: 12 },
    { position: 4, team: 'Coolboy Rangers', played: 7, won: 2, drawn: 1, lost: 4, gd: -5, points: 7 },
    { position: 5, team: 'Wolfe Tone', played: 7, won: 0, drawn: 0, lost: 7, gd: -21, points: 0 },
  ],
  'U13 Division 2': [
      { position: 1, team: 'Carnew', played: 6, won: 5, drawn: 1, lost: 0, gd: 12, points: 16 },
      { position: 2, team: 'Aughrim Rangers', played: 6, won: 3, drawn: 2, lost: 1, gd: 5, points: 11 },
      { position: 3, team: 'Shillelagh', played: 6, won: 2, drawn: 1, lost: 3, gd: -4, points: 7 },
      { position: 4, team: 'Avonmore', played: 6, won: 0, drawn: 0, lost: 6, gd: -13, points: 0 },
  ],

  // --- UNDER 14 ---
  'U14 Premier': [
    { position: 1, team: 'Arklow Town', played: 14, won: 12, drawn: 1, lost: 1, gd: 40, points: 37 },
    { position: 2, team: 'St. Anthonys', played: 14, won: 10, drawn: 2, lost: 2, gd: 28, points: 32 },
    { position: 3, team: 'Wicklow Rovers', played: 13, won: 8, drawn: 3, lost: 2, gd: 15, points: 27 },
    { position: 4, team: 'Glencormac United', played: 14, won: 6, drawn: 1, lost: 7, gd: 0, points: 19 },
    { position: 5, team: 'Ashford Rovers', played: 14, won: 4, drawn: 2, lost: 8, gd: -12, points: 14 },
    { position: 6, team: 'Rathnew AFC', played: 13, won: 2, drawn: 1, lost: 10, gd: -25, points: 7 },
    { position: 7, team: 'Newtown Juniors', played: 14, won: 0, drawn: 2, lost: 12, gd: -46, points: 2 },
  ],
  'U14 Division 1': [
    { position: 1, team: 'Roundwood AFC', played: 10, won: 8, drawn: 1, lost: 1, gd: 22, points: 25 },
    { position: 2, team: 'Arklow Celtic', played: 10, won: 7, drawn: 2, lost: 1, gd: 19, points: 23 },
    { position: 3, team: 'Greystones United', played: 9, won: 5, drawn: 0, lost: 4, gd: 5, points: 15 },
    { position: 4, team: 'Ardmore Rovers', played: 10, won: 3, drawn: 1, lost: 6, gd: -8, points: 10 },
    { position: 5, team: 'Carnew', played: 9, won: 2, drawn: 0, lost: 7, gd: -15, points: 6 },
    { position: 6, team: 'Avonmore', played: 10, won: 1, drawn: 0, lost: 9, gd: -23, points: 3 },
  ],

  // --- UNDER 15 ---
  'U15 Premier': [
    { position: 1, team: 'Arklow Town', played: 9, won: 8, drawn: 1, lost: 0, gd: 25, points: 25 },
    { position: 2, team: 'Wicklow Rovers', played: 9, won: 6, drawn: 2, lost: 1, gd: 14, points: 20 },
    { position: 3, team: 'Greystones United', played: 9, won: 4, drawn: 2, lost: 3, gd: 5, points: 14 },
    { position: 4, team: 'St. Patricks', played: 8, won: 3, drawn: 1, lost: 4, gd: -2, points: 10 },
    { position: 5, team: 'Ashford Rovers', played: 9, won: 2, drawn: 0, lost: 7, gd: -15, points: 6 },
    { position: 6, team: 'Rathnew AFC', played: 8, won: 0, drawn: 0, lost: 8, gd: -27, points: 0 },
  ],
  'U15 Division 1': [
    { position: 1, team: 'Arklow United', played: 7, won: 6, drawn: 0, lost: 1, gd: 16, points: 18 },
    { position: 2, team: 'Enniskerry YC', played: 7, won: 5, drawn: 1, lost: 1, gd: 12, points: 16 },
    { position: 3, team: 'Wolfe Tone', played: 6, won: 3, drawn: 1, lost: 2, gd: 4, points: 10 },
    { position: 4, team: 'Kilcoole', played: 7, won: 2, drawn: 0, lost: 5, gd: -8, points: 6 },
    { position: 5, team: 'Shillelagh', played: 7, won: 0, drawn: 0, lost: 7, gd: -24, points: 0 },
  ],

  // --- UNDER 16 ---
  'U16 Premier': [
    { position: 1, team: 'Arklow Town', played: 10, won: 9, drawn: 1, lost: 0, gd: 25, points: 28 },
    { position: 2, team: 'Wicklow Rovers', played: 10, won: 8, drawn: 1, lost: 1, gd: 18, points: 25 },
    { position: 3, team: 'Ashford Rovers', played: 9, won: 6, drawn: 0, lost: 3, gd: 12, points: 18 },
    { position: 4, team: 'Greystones United', played: 10, won: 4, drawn: 2, lost: 4, gd: 2, points: 14 },
    { position: 5, team: 'Newtown Juniors', played: 10, won: 3, drawn: 1, lost: 6, gd: -5, points: 10 },
    { position: 6, team: 'St. Patricks', played: 9, won: 1, drawn: 1, lost: 7, gd: -15, points: 4 },
  ],
  'U16 Division 1': [
      { position: 1, team: 'Glencormac United', played: 8, won: 7, drawn: 0, lost: 1, gd: 15, points: 21 },
      { position: 2, team: 'Ardmore Rovers', played: 8, won: 5, drawn: 1, lost: 2, gd: 8, points: 16 },
      { position: 3, team: 'Coolboy Rangers', played: 8, won: 3, drawn: 1, lost: 4, gd: -2, points: 10 },
      { position: 4, team: 'Avonmore', played: 8, won: 2, drawn: 0, lost: 6, gd: -10, points: 6 },
      { position: 5, team: 'Arklow Celtic', played: 8, won: 2, drawn: 0, lost: 6, gd: -11, points: 6 },
  ],

  // --- YOUTHS (U18) ---
  'Youths Premier': [
    { position: 1, team: 'Wicklow Rovers', played: 12, won: 10, drawn: 2, lost: 0, gd: 24, points: 32 },
    { position: 2, team: 'Arklow Town', played: 12, won: 9, drawn: 1, lost: 2, gd: 20, points: 28 },
    { position: 3, team: 'Newtown Juniors', played: 11, won: 6, drawn: 2, lost: 3, gd: 8, points: 20 },
    { position: 4, team: 'Ashford Rovers', played: 12, won: 5, drawn: 1, lost: 6, gd: -4, points: 16 },
    { position: 5, team: 'St. Anthonys', played: 11, won: 3, drawn: 2, lost: 6, gd: -10, points: 11 },
  ],

  // --- GIRLS LEAGUES ---
  'Girls U10 Group A': [
      { position: 1, team: 'Arklow Town', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
      { position: 2, team: 'Wicklow Rovers', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
      { position: 3, team: 'Greystones United', played: 0, won: 0, drawn: 0, lost: 0, gd: 0, points: 0 },
  ],
  'Girls U12 Premier': [
      { position: 1, team: 'Wicklow Rovers', played: 10, won: 10, drawn: 0, lost: 0, gd: 40, points: 30 },
      { position: 2, team: 'Arklow Town', played: 10, won: 7, drawn: 1, lost: 2, gd: 15, points: 22 },
      { position: 3, team: 'Greystones United', played: 10, won: 5, drawn: 1, lost: 4, gd: 5, points: 16 },
      { position: 4, team: 'Newtown Juniors', played: 10, won: 2, drawn: 0, lost: 8, gd: -20, points: 6 },
  ],
  'Girls U14 Premier': [
      { position: 1, team: 'Arklow Town', played: 8, won: 6, drawn: 1, lost: 1, gd: 18, points: 19 },
      { position: 2, team: 'Glencormac United', played: 8, won: 5, drawn: 2, lost: 1, gd: 12, points: 17 },
      { position: 3, team: 'St. Patricks', played: 8, won: 3, drawn: 1, lost: 4, gd: -5, points: 10 },
      { position: 4, team: 'Wicklow Rovers', played: 8, won: 1, drawn: 0, lost: 7, gd: -25, points: 3 },
  ]
};

// Returns a list of divisions a specific club plays in
export const getClubDivisions = (clubName: string): string[] => {
  const playingDivisions: string[] = [];
  
  Object.entries(LEAGUE_TABLES).forEach(([division, rows]) => {
    // Check if the exact name matches or if the row name contains the club name (e.g. Arklow Town A)
    if (rows.some(row => row.team === clubName || row.team.includes(clubName + ' '))) {
      playingDivisions.push(division);
    }
  });

  return playingDivisions;
};

export const UPCOMING_FIXTURES: Fixture[] = [
  // Today's Games (Live/Upcoming)
  {
    id: 'f_today_1',
    homeTeam: getClub('Arklow Town'),
    awayTeam: getClub('Wicklow Rovers'),
    date: new Date(new Date().setHours(18, 30)), // Today 6:30 PM
    venue: 'Travers Insurances Park',
    competition: 'U14 Premier',
    status: 'upcoming',
    weather: 'rain'
  },
  {
    id: 'f_today_ssg',
    homeTeam: getClub('Greystones United'),
    awayTeam: getClub('Newtown Juniors'),
    date: new Date(new Date().setHours(18, 0)),
    venue: 'Woodlands',
    competition: 'U8 Group B',
    status: 'upcoming',
    weather: 'cloudy'
  },
  {
    id: 'f_today_2',
    homeTeam: getClub('Greystones United'),
    awayTeam: getClub('Newtown Juniors'),
    date: new Date(new Date().setHours(19, 0)), // Today 7:00 PM
    venue: 'Woodlands',
    competition: 'U16 Premier',
    status: 'upcoming',
    weather: 'cloudy'
  },
  {
    id: 'f_today_3',
    homeTeam: getClub('Ashford Rovers'),
    awayTeam: getClub('Rathnew AFC'),
    date: new Date(new Date().setHours(19, 30)), 
    venue: 'Ballinalea Park',
    competition: 'U16 Premier',
    status: 'upcoming',
    weather: 'rain'
  },
  // Girls Game Today
  {
    id: 'f_today_4',
    homeTeam: getClub('Wicklow Rovers'),
    awayTeam: getClub('Arklow Town'),
    date: new Date(new Date().setHours(18, 0)),
    venue: 'Whitegates',
    competition: 'Girls U12 Premier',
    status: 'upcoming',
    weather: 'rain'
  },
  // Tomorrow
  {
    id: 'f_tom_ssg_1',
    homeTeam: getClub('Arklow Celtic'),
    awayTeam: getClub('Coolboy Rangers'),
    date: addDays(1),
    venue: 'Celtic Park',
    competition: 'U9 Group A',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
    id: 'f_tom_1',
    homeTeam: getClub('Glencormac United'),
    awayTeam: getClub('St. Anthonys'),
    date: addDays(1),
    venue: 'Gerry O\'Toole Park',
    competition: 'U14 Premier',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
    id: 'f_tom_2',
    homeTeam: getClub('Wolfe Tone'),
    awayTeam: getClub('Ardmore Rovers'),
    date: addDays(1),
    venue: 'Vartry Grounds',
    competition: 'U12 Division 1',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
    id: 'f_tom_3',
    homeTeam: getClub('Arklow Celtic'),
    awayTeam: getClub('Roundwood AFC'),
    date: addDays(1),
    venue: 'Celtic Park',
    competition: 'U12 Division 2',
    status: 'upcoming',
    weather: 'cloudy'
  },
  // Weekend
  {
    id: 'f_we_ssg_u10',
    homeTeam: getClub('St. Patricks'),
    awayTeam: getClub('Avonmore'),
    date: addDays(2),
    venue: 'Avoca',
    competition: 'U10 Group B',
    status: 'upcoming',
    weather: 'rain'
  },
  {
    id: 'f_we_1',
    homeTeam: getClub('Coolboy Rangers'),
    awayTeam: getClub('Glencormac United'),
    date: addDays(2),
    venue: 'Coolboy',
    competition: 'U13 Division 1',
    status: 'upcoming',
    weather: 'windy'
  },
  {
    id: 'f_we_2',
    homeTeam: getClub('Roundwood AFC'),
    awayTeam: getClub('Arklow Celtic'),
    date: addDays(2),
    venue: 'Vartry Grounds',
    competition: 'U14 Division 1',
    status: 'upcoming',
    weather: 'cloudy'
  },
  {
    id: 'f_we_3',
    homeTeam: getClub('Enniskerry YC'),
    awayTeam: getClub('Avonmore'),
    date: addDays(2),
    venue: 'Berryfield',
    competition: 'U12 Division 1',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
    id: 'f_we_4',
    homeTeam: getClub('Arklow Town'),
    awayTeam: getClub('Wicklow Rovers'),
    date: addDays(3),
    venue: 'Travers Insurances Park',
    competition: 'U12 Premier',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
    id: 'f_we_5',
    homeTeam: getClub('St. Anthonys'),
    awayTeam: getClub('Ashford Rovers'),
    date: addDays(3),
    venue: 'Finn Park',
    competition: 'U12 Premier',
    status: 'upcoming',
    weather: 'sunny'
  },
  {
      id: 'f_we_6',
      homeTeam: getClub('Carnew'),
      awayTeam: getClub('Aughrim Rangers'),
      date: addDays(3),
      venue: 'Carnew',
      competition: 'U13 Division 2',
      status: 'upcoming',
      weather: 'cloudy'
  }
];

export const RECENT_RESULTS: Fixture[] = [
  {
    id: 'r1',
    homeTeam: getClub('Wicklow Rovers'),
    awayTeam: getClub('Arklow Town'),
    date: addDays(-1),
    venue: 'Whitegates',
    competition: 'U13 Premier',
    score: { home: 2, away: 2 },
    status: 'finished'
  },
  {
    id: 'r_ssg_1',
    homeTeam: getClub('Arklow Town'),
    awayTeam: getClub('Rathnew AFC'),
    date: addDays(-1),
    venue: 'Lamberton',
    competition: 'U8 Group A',
    status: 'finished'
  },
  {
    id: 'r2',
    homeTeam: getClub('Newtown Juniors'),
    awayTeam: getClub('Ashford Rovers'),
    date: addDays(-2),
    venue: 'Newtown',
    competition: 'U13 Premier',
    score: { home: 1, away: 4 },
    status: 'finished'
  },
  {
    id: 'r3',
    homeTeam: getClub('St. Patricks'),
    awayTeam: getClub('Greystones United'),
    date: addDays(-2),
    venue: 'Avoca',
    competition: 'U13 Premier',
    score: { home: 3, away: 0 },
    status: 'finished'
  },
  {
    id: 'r4',
    homeTeam: getClub('Kilcoole'),
    awayTeam: getClub('Roundwood AFC'),
    date: addDays(-3),
    venue: 'Kilcoole',
    competition: 'U12 Division 2',
    score: { home: 0, away: 5 },
    status: 'finished'
  },
  {
    id: 'r5',
    homeTeam: getClub('Rathnew AFC'),
    awayTeam: getClub('Glencormac United'),
    date: addDays(-3),
    venue: 'Shamrock Park',
    competition: 'U14 Premier',
    score: { home: 1, away: 4 },
    status: 'finished'
  },
  {
    id: 'r6',
    homeTeam: getClub('Arklow United'),
    awayTeam: getClub('Enniskerry YC'),
    date: addDays(-4),
    venue: 'Arklow',
    competition: 'U15 Division 1',
    score: { home: 2, away: 1 },
    status: 'finished'
  }
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'WDSL Cup Finals Set for Arklow',
    summary: 'The committee has confirmed that this season\'s cup finals will be hosted by Arklow Town at Travers Insurances Park.',
    date: 'Today',
    category: 'Cup',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe436cd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n2',
    title: 'Respect The Ref Campaign',
    summary: 'Wicklow League launches new initiative to support young referees. Zero tolerance for sideline abuse.',
    date: 'Yesterday',
    category: 'Announcement',
    imageUrl: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n3',
    title: 'Kennedy Cup Squad Announced',
    summary: 'The WDSL squad for the upcoming Kennedy Cup in Limerick has been finalized. Best of luck to the boys.',
    date: '2 days ago',
    category: 'League',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];
