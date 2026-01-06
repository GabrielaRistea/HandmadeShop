import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Category, CategoryCreation } from '../DTOs/Category';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor() {}
  private http = inject(HttpClient);
  private ordersUrl = environment.apiURL + 'Orders';
  private historyUrl = environment.apiURL + 'HistoryOrders';

  public getCart(): Observable<any> {
    return this.http.get<any>(this.ordersUrl);
  }

  public addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.ordersUrl}/add`, { productId, quantity });
  }

  public updateQuantity(productId: number, increase: boolean): Observable<any> {
    return this.http.post(`${this.ordersUrl}/update-quantity?productId=${productId}&increase=${increase}`, {});
  }

  public clearCart(): Observable<any> {
    return this.http.delete(`${this.ordersUrl}/clear`);
  }

  public checkout(checkoutDto: any): Observable<any> {
    return this.http.post(`${this.ordersUrl}/checkout`, checkoutDto);
  }

  public confirmPayment(sessionId: string): Observable<any> {
    return this.http.post(`${this.ordersUrl}/confirm-payment?session_id=${sessionId}`, {});
  }

  public getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.historyUrl}/my-orders`);
  }

  public getAllOrdersAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.historyUrl}/all-orders`);
  }

  public updateOrderStatus(id: number, newStatus: string): Observable<any> {
    return this.http.patch(`${this.historyUrl}/${id}/status`, { newStatus });
  }
}