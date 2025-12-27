import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthResponse } from '../DTOs/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiURL;

  isLoggedIn = signal<boolean>(!!localStorage.getItem('accessToken'));
  isAdmin = signal<boolean>(localStorage.getItem('userRole') === 'admin');
  currentUser = signal<any>(null);

  constructor() {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      this.currentUser.set({ email: savedEmail }); 
    }

    if (this.isLoggedIn()) {
      this.getUserInfo().subscribe();
    }
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Account/user-info`).pipe(
      tap(user => {
        this.currentUser.set(user);
        const roles: string[] = user.roles || [];
        
        const isAdminUser = roles.includes('admin');
        this.isAdmin.set(isAdminUser);

        if (isAdminUser) {
          localStorage.setItem('userRole', 'admin');
        } else {
          localStorage.removeItem('userRole');
        }
        if (user.email) {
          localStorage.setItem('userEmail', user.email);  
        }
      })
    );
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}login`, credentials).pipe(
      tap(res => {
        this.saveTokens(res);
        this.isLoggedIn.set(true);
      }),
      switchMap(() => this.getUserInfo())
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Account/register`, data);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.apiUrl}refresh`, { refreshToken }).pipe(
      tap(res => this.saveTokens(res))
    );
  }

  private saveTokens(res: AuthResponse) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.set(false);
    this.isAdmin.set(false);
    this.currentUser.set(null);
  }
  
}
