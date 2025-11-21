import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ArtistDto } from '../DTOs/ArtistDto';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {

  constructor() {}
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'artist';

  public get(): Observable<ArtistDto[]> {
    return this.http.get<ArtistDto[]>(this.apiUrl, {responseType: "json"});
  } 
  public post(artistDto: ArtistDto) : Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, artistDto, {responseType: "json"});
  }



}
