
export interface Team {
  id: string;
  name: string;
  crestUrl?: string;
  shortName: string;
  colors: [string, string]; // Primary, Secondary hex codes
}

export interface Fixture {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: Date;
  venue: string;
  competition: string;
  score?: {
    home: number;
    away: number;
  };
  status: 'upcoming' | 'live' | 'finished' | 'postponed';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'League' | 'Cup' | 'Club' | 'Announcement';
  imageUrl: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TableRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
}

export interface Favorite {
  clubId: string;
  clubName: string;
  division: string; // e.g., 'U14 Premier'
}
