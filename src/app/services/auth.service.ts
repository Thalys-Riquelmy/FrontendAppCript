// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO, RegisterDTO } from '../models/auth.dto';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /*private api = 'http://localhost:8080/auth'; */
  private api = 'https://routepro-latest.onrender.com/auth'; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(data: LoginDTO) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  register(data: RegisterDTO) {
    return this.http.post(`${this.api}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
