import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contribution } from '../models/contribution';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8089/contribution';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

    constructor(private http: HttpClient) { }

  getAll(): Observable<Contribution[]> {
    return this.http.get<Contribution[]>(baseUrl + '/retrieve-all-contributions');
  }

  addContribution(prime: Contribution): Observable<Contribution> {
    return this.http.post<Contribution>(baseUrl + '/add-contribution', prime);
  }

  deleteContribution(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/remove-contribution/${id}`, { responseType: 'text' });
  }

  getContribution(id: number): Observable<Contribution> {
    return this.http.get<Contribution>(`${baseUrl}/retrieve-contribution/${id}`);
  }

  affectContribution(prime: Contribution, userId: number): Observable<Contribution> {
    return this.http.put<Contribution>(`${baseUrl}/affect-contribution/${userId}`, prime);
  }
  
}
