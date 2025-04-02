import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/env';
import { LoginI } from '../interfaces/login';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = `${environment.url_base}/auth`;

    constructor(private http: HttpClient) { }

    loginUser(userData: LoginI): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const url = `${this.apiUrl}/login-user`;
        return this.http.post<any>(url, userData, httpOptions);
    }
}
