import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../models/artist.model';
import { ArtistFormComponent } from '../artist-form/artist-form.component';
import { ArtistWebService } from '../../services/artist-web.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-artist-list',
  standalone: true, // Ce composant n’a pas besoin d’être déclaré dans un NgModule
  imports: [CommonModule, HttpClientModule, ArtistFormComponent],
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  // Injection du webservice Angular (DI = Dependency Injection)
  constructor(private artistWebService: ArtistWebService) {}

  ngOnInit(): void {
    // Récupération des artistes au chargement du composant
    this.artistWebService.getArtists().subscribe((data) => {
      this.artists = data;
    });
  }

  deleteArtist(id: string): void {
    this.artistWebService.deleteArtist(id).subscribe(() => {
      // Mise à jour de la liste après suppression
      this.artistWebService.getArtists().subscribe((data) => {
        this.artists = data;
      });
    });
  }

  addArtist(newArtist: Artist): void {
    this.artistWebService.addArtist(newArtist).subscribe(() => {
      // Mise à jour de la liste après ajout
      this.artistWebService.getArtists().subscribe((data) => {
        this.artists = data;
      });
    });
  }
}
