import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./artist-form.component.scss']
})
export class ArtistFormComponent {
  artistForm: FormGroup;
  @Output() artistAdded = new EventEmitter<Artist>();

  constructor(private fb: FormBuilder) {
    this.artistForm = this.fb.group({
      name: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.artistForm.valid) {
      const newArtist: Artist = {
        id: Date.now(), // ID unique basé sur le timestamp
        name: this.artistForm.value.name,
        photoUrl: this.artistForm.value.photoUrl
      };
      this.artistAdded.emit(newArtist);
      this.artistForm.reset();
    }
  }
}
