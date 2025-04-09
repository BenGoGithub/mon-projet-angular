import { TestBed } from '@angular/core/testing';
import { ArtistService } from './artist.service';
import { Artist } from '../models/artist.model';

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with a default list of artists', () => {
    const defaultArtists: Artist[] = [
      { id: 1, name: 'David Bowie', photoUrl: 'assets/images/artists/bowie.jpg' },
      { id: 2, name: 'Nina Simone', photoUrl: 'assets/images/artists/simone.jpg' },
      { id: 3, name: 'Bob Marley', photoUrl: 'assets/images/artists/marley.jpg' },
      { id: 4, name: 'Björk', photoUrl: 'assets/images/artists/bjork.jpg' }
    ];
    expect(service.getArtists()).toEqual(defaultArtists);
  });

  it('should add a new artist to the list', () => {
    const newArtist: Artist = { id: 5, name: 'New Artist', photoUrl: 'assets/images/artists/new.jpg' };
    service.addArtist(newArtist);
    const updatedArtists = service.getArtists();
    expect(updatedArtists.length).toBe(5); // Vérifie que la liste a été mise à jour
    expect(updatedArtists).toContain(newArtist); // Vérifie que le nouvel artiste est présent
  });

  it('should delete an artist from the list', () => {
    const initialLength = service.getArtists().length;
    service.deleteArtist(1); // Supprime l'artiste avec l'ID 1
    const updatedArtists = service.getArtists();
    expect(updatedArtists.length).toBe(initialLength - 1); // Vérifie que la liste a été mise à jour
    expect(updatedArtists.find(artist => artist.id === 1)).toBeUndefined(); // Vérifie que l'artiste a été supprimé
  });
});
