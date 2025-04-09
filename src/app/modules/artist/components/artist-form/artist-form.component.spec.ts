import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistFormComponent } from './artist-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Artist } from '../../models/artist.model';

describe('ArtistFormComponent', () => {
  let component: ArtistFormComponent;
  let fixture: ComponentFixture<ArtistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an artistAdded event when the form is submitted', () => {
    component.artistForm.controls['name'].setValue('New Artist');
    component.artistForm.controls['photoUrl'].setValue('assets/images/artists/new.jpg');

    let emittedArtist: Artist | undefined;
    component.artistAdded.subscribe((artist: Artist) => {
      emittedArtist = artist;
    });

    component.onSubmit(); // Simule la soumission du formulaire

    expect(emittedArtist).toBeDefined(); // Vérifie qu'un artiste a été émis
    expect(emittedArtist?.name).toBe('New Artist'); // Vérifie les détails de l'artiste
    expect(emittedArtist?.photoUrl).toBe('assets/images/artists/new.jpg');
  });

  it('should reset the form after submission', () => {
    component.artistForm.controls['name'].setValue('New Artist');
    component.artistForm.controls['photoUrl'].setValue('assets/images/artists/new.jpg');
    component.onSubmit(); // Simule la soumission du formulaire
    expect(component.artistForm.controls['name'].value).toBe(''); // Vérifie que le formulaire a été réinitialisé
    expect(component.artistForm.controls['photoUrl'].value).toBe('');
  });
});
