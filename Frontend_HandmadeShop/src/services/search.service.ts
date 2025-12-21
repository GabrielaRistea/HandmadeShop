import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../DTOs/ProductDto';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'product';

  private searchSource = new BehaviorSubject<string>('');

  searchObservable = this.searchSource.asObservable();

  updateSearchTerm(term: string) {
    this.searchSource.next(term);
  }

  public get(): Observable<ProductDto[]> {
        return this.http.get<ProductDto[]>(this.apiUrl, {responseType: "json"});
      }

  searchProductsApi(name: string) {
    return this.http.get<ProductDto[]>(this.apiUrl + '/by-product-name/' + name);
  }    
}
