import { render, screen } from '@testing-library/angular';
import { ArtistListComponent } from './artist-list.component';
import { ArtistService } from '../../services/artist.service';

describe('ArtistListComponent Template', () => {
  it('should display the list of artists', async () => {
    const mockArtistService = {
      getArtists: jasmine.createSpy('getArtists').and.returnValue([
        { id: 1, name: 'David Bowie', photo: 'assets/images/artists/bowie.jpg' },
        { id: 2, name: 'Nina Simone', photo: 'assets/images/artists/simone.jpg' }
      ])
    };

    await render(ArtistListComponent, {
      providers: [{ provide: ArtistService, useValue: mockArtistService }]
    });

    const artistCards = screen.getAllByRole('article'); // Utilise le rôle "article" pour les cartes d'artistes
    expect(artistCards.length).toBe(2); // Vérifie qu'il y a 2 cartes d'artistes
    expect(artistCards[0].textContent).toContain('David Bowie'); // Vérifie le contenu de la première carte
    expect(artistCards[1].textContent).toContain('Nina Simone'); // Vérifie le contenu de la deuxième carte
  });
});
