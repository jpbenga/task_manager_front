import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          if (response && response.jwt) {
            this.setToken(response.jwt);
          }
        })
      );
  }

  setToken(token: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true'); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    //console.log(localStorage.getItem('isLoggedIn'));
    return localStorage.getItem('isLoggedIn') === 'true' && !!this.getToken();

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  }
}
