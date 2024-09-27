import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private path = `${environment.apiBaseURL}api/auth/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.path, { email, password });
  }

  loggedIn() {
    return !!localStorage.getItem('token') // Funciona como un if condicional, retorna true o false
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
  }
}
