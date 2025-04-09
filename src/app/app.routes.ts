import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';
import { ArtistListComponent } from './modules/artist/components/artist-list/artist-list.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'artists', component: ArtistListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
