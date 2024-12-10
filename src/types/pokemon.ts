export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  images: string[];
  stats: {
    name: string;
    value: number;
  }[];
  moves: string[];
  height: number;
  weight: number;
}