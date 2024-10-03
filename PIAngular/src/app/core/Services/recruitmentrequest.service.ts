import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecruitmentRequest } from '../Models/recruitmentrequest';
import { Observable } from 'rxjs';
const apiUrl = 'http://localhost:8089/recruitmentrequest';
@Injectable({
  providedIn: 'root'
})
export class RecruitmentrequestService {


  constructor(private http: HttpClient) {}


  createRecruitmentRequest(recruitmentRequest: RecruitmentRequest): Observable<any> {
    return this.http.post<any>(apiUrl + '/createrequest', recruitmentRequest);
  }
  
}
