import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';

// Le décorateur @Injectable permet à Angular d'injecter ce service dans d'autres classes (ex: composants)
@Injectable({
  providedIn: 'root' // Le service est fourni au niveau racine de l'application (singleton)
})
export class ArtistWebService {

  private readonly apiUrl = 'https://artists-api-ndhd.onrender.com';
  private readonly token = 'f3e91f07a577250eb7bda4fccf37adf0';

  // Création des headers avec le token pour autorisation
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // 🔽 Récupère tous les artistes
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}/artists`, { headers: this.headers });
  }

  // 🔽 Récupère un artiste spécifique par son ID
  getArtistById(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`, { headers: this.headers });
  }

  // 🔽 Ajoute un nouvel artiste
  addArtist(artist: Omit<Artist, 'id'>): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiUrl}/artists`, artist, { headers: this.headers });
  }

  // 🔽 Met à jour un artiste existant (partiellement ou entièrement)
  updateArtist(id: string, updates: Partial<Omit<Artist, 'id'>>): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/artists/${id}`, updates, { headers: this.headers });
  }

  // 🔽 Supprime un artiste (sauf s’il reste moins de 3 artistes)
  deleteArtist(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/artists/${id}`, { headers: this.headers });
  }
}
