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
      photo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.artistForm.valid) {
      const newArtist: Artist = {
        id: crypto.randomUUID(),
        name: this.artistForm.value.name,
        photo: this.artistForm.value.photo
      };
      this.artistAdded.emit(newArtist);
      this.artistForm.reset();
    }
  }
}
