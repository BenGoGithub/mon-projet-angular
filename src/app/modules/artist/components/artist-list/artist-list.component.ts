import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist.model';
import {ArtistFormComponent} from '../artist-form/artist-form.component';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [CommonModule, ArtistFormComponent],
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artists = this.artistService.getArtists();
  }
  deleteArtist(id: number): void {
    this.artistService.deleteArtist(id);
    this.artists = this.artistService.getArtists(); // Mettre à jour la liste
  }

  addArtist(newArtist: Artist): void {
    this.artistService.addArtist(newArtist);
    this.artists = this.artistService.getArtists(); // Mettre à jour la liste
  }
}
