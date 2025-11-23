import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Category, CategoryCreation } from '../DTOs/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL + 'category';

  public get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl, {responseType: "json"});
  }
  
  public create(category: CategoryCreation) {
    return this.http.post(`${this.apiUrl}`, category);
  }
  
  public getById (id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public update(id: number | string, category: Category): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  public delete(id: number ): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
