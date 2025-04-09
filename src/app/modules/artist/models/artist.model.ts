export interface Artist {
  id: number;
  name: string;
  genre?: string;
  description?: string; // ? indique que la propriété est optionnelle
  photoUrl?: string;
}
