import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../Models/candidate';
const apiUrl = 'http://localhost:8089/candidate';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }
  

  createCandidate(candidate: Candidate): Observable<any> {
    return this.http.post<any>(apiUrl + '/addCandidate', candidate);
  }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(apiUrl + '/getAllCand');
  }

  getCandidateById(idCandidate: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${apiUrl}/getCand/${idCandidate}`);
  }
  assignRecruitmentToCandidate(idCandidate: number, offerId: number): Observable<HttpResponse<string>> {
    return this.http.post(`${apiUrl}/candidates/${idCandidate}/assign-recruitment/${offerId}`, null, { observe: 'response', responseType: 'text' });
  }
  getCandidateCountForOffer(offerId: number): Observable<number> {
    return this.http.get<number>(`${apiUrl}/count?offerId=${offerId}`);
  }
  
  
}
