import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/env';
import { VideoI } from '../interfaces/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = `${environment.url_base}/videos`;
  private token = sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
      params: { query },
    };
    const url = `${this.apiUrl}/search`;
    return this.http.get<any>(url, httpOptions);
  }

  savFavoriteVideo(videoData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
    const url = `${this.apiUrl}/favorite-video`;
    return this.http.post<any>(url, videoData, httpOptions);
  }
}
