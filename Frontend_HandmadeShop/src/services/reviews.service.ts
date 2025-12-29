import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ReviewReadDto, ReviewCreateDto } from '../DTOs/ReviewDto';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'review'; 

  constructor() {}

  public getByProductId(productId: number): Observable<ReviewReadDto[]> {
    return this.http.get<ReviewReadDto[]>(`${this.apiUrl}/product/${productId}`);
  }

  public post(review: ReviewCreateDto): Observable<ReviewReadDto> {
    return this.http.post<ReviewReadDto>(this.apiUrl, review);
  }
}
