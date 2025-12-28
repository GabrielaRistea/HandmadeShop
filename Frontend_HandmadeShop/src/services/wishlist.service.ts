import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDto } from '../DTOs/ProductDto';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'wishlist';

  constructor() {}
  public get(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.apiUrl);
  }

  public add(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${productId}`, {});
  }

  public remove(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  private wishlistCountSource = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSource.asObservable();

  updateCount(count: number) {
    this.wishlistCountSource.next(count);
}
}
