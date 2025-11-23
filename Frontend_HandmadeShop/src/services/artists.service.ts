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
  // public post(artistDto: ArtistDto) : Observable<{ success: boolean }> {
  //   return this.http.post<{ success: boolean }>(this.apiUrl, artistDto, {responseType: "json"});
  // }

  public postFormData(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  public updateFormData(id: number | string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public getById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public delete(id: number ): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}
