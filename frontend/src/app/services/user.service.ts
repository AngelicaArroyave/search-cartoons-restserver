import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path = `${environment.apiBaseURL}api/users`

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(this.path)
  }
}
