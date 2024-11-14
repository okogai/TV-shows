export interface ITVShow{
  id: number;
  name: string;
  language: string;
  rating: { average: number | null };
  network: { country: { name: string } };
  schedule: { time: string; days: string[] };
  image: { medium: string };
  summary: string;
}

export interface ShowSearchResult {
  show: {
    id: number;
    name: string;
  };
}

export interface ShowOption {
  title: string;
  id: number;
}