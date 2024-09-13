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
    return this.http.post(this.path, { email, password });
  }
}
