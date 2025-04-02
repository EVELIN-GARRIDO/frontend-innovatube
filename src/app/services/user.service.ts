import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/env';
import { UserI } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = `${environment.url_base}/users`;

  constructor(private http: HttpClient) { }

  registerUser(userData: UserI): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const url = `${this.apiUrl}/register-user`;
    return this.http.post<any>(url, userData, httpOptions);
  }
}
