import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductDto } from '../DTOs/ProductDto';
import { Category } from '../DTOs/Category';
import { Artist, ArtistDto } from '../DTOs/ArtistDto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor() {}
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'product';
  
  public get(): Observable<ProductDto[]> {
      return this.http.get<ProductDto[]>(this.apiUrl, {responseType: "json"});
    }
    
  public postFormData(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }


}
