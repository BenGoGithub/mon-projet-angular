import { Injectable } from '@angular/core';
import { Artist } from '../models/artist.model';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private artists: Artist[] = [
    { id: 1, name: 'David Bowie', photoUrl: 'assets/images/artists/bowie.jpg' },
    { id: 2, name: 'Nina Simone', photoUrl: 'assets/images/artists/simone.jpg' },
    { id: 3, name: 'Bob Marley', photoUrl: 'assets/images/artists/marley.jpg' },
    { id: 4, name: 'Björk', photoUrl: 'assets/images/artists/bjork.jpg' }
  ];

  getArtists(): Artist[] {
    return this.artists;
  }

  addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  deleteArtist(id: number): void {
    this.artists = this.artists.filter(artist => artist.id !== id);
  }
}
