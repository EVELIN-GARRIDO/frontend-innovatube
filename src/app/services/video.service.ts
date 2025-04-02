import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/env';

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  private apiUrl = `${environment.url_base}/videos`;

  constructor(private http: HttpClient) { }

  searchVideos(query: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: { query } 
    };
    const url = `${this.apiUrl}/search`;  
    return this.http.get<any>(url, httpOptions);  
  }
}
