import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistListComponent } from './artist-list.component';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let fixture: ComponentFixture<ArtistListComponent>;
  let mockArtistService: Partial<ArtistService>;

  beforeEach(async () => {
    // Mock du service ArtistService
    mockArtistService = {
      getArtists: jasmine.createSpy('getArtists').and.returnValue([
        { id: 1, name: 'David Bowie', photoUrl: 'assets/images/artists/bowie.jpg' },
        { id: 2, name: 'Nina Simone', photoUrl: 'assets/images/artists/simone.jpg' }
      ]),
      addArtist: jasmine.createSpy('addArtist'),
      deleteArtist: jasmine.createSpy('deleteArtist')
    };

    await TestBed.configureTestingModule({
      declarations: [ArtistListComponent],
      providers: [{ provide: ArtistService, useValue: mockArtistService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of artists', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.artist-card').length).toBe(2); // Vérifie qu'il y a 2 artistes affichés
    expect(compiled.querySelector('.artist-card h3')?.textContent).toContain('David Bowie'); // Vérifie le nom d'un artiste
  });

  it('should delete an artist when the delete button is clicked', () => {
    const deleteButton = fixture.nativeElement.querySelector('.artist-card button');
    deleteButton.click(); // Simule un clic sur le bouton "Supprimer"
    expect(mockArtistService.deleteArtist).toHaveBeenCalledWith(1); // Vérifie que la méthode deleteArtist a été appelée
  });

  it('should add a new artist when the artistAdded event is emitted', () => {
    const newArtist: Artist = { id: 3, name: 'New Artist', photoUrl: 'assets/images/artists/new.jpg' };
    component.addArtist(newArtist); // Simule l'ajout d'un nouvel artiste
    expect(mockArtistService.addArtist).toHaveBeenCalledWith(newArtist); // Vérifie que la méthode addArtist a été appelée
    expect(component.artists.length).toBe(3); // Vérifie que la liste a été mise à jour
  });
});
