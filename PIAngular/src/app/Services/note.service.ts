import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:8089/Note';

  constructor(private http: HttpClient) { }

  countNoteOccurrences(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/countNoteOccurrences`);
  }
  countUserOccurrencesForNote1(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Perfermance1`);
  }

  countUserOccurrencesForNote3(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Perfermance3`);
  }
}
