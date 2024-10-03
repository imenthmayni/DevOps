import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Recruitment } from '../Models/recruitment';

const apiUrl = 'http://localhost:8089/recruitment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {
  constructor(private http: HttpClient) { }

  createRecruitment(recruitment: Recruitment): Observable<any> {
    return this.http.post<any>(apiUrl + '/addRecruitment', recruitment);
  }

  deleteRec(offerId: number): Observable<any> {
    return this.http.delete(`${apiUrl}/delete/${offerId}`);
  }

  getRecruitments(): Observable<Recruitment[]> {
    return this.http.get<Recruitment[]>(apiUrl + '/allRecruitments');
  }

  getRecruitmentById(offerId: number): Observable<Recruitment> {
    return this.http.get<Recruitment>(`${apiUrl}/get/${offerId}`);
  }
  getPostTitles(): Observable<string[]> {
    return this.http.get<string[]>(`${apiUrl}/postTitles`);
  }
  getPostTitleDetails(postTitle: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/getPostTitleDetails/${postTitle}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching post title details:', error);
          throw error; // You can handle errors according to your application's requirements
        })
      );
  }
  analyzePostTitleTrend(postTitle: string, startYear: number, endYear: number): Observable<any> {
    const url = `${apiUrl}/recruitment/P?postTitle=${postTitle}&startYear=${startYear}&endYear=${endYear}`;
    return this.http.get<any>(url);
  }
  getAverageSalaryRange(): Observable<number> {
    return this.http.get<number>(`${apiUrl}/averageSalaryRange`);
  }

  getRecruitmentsPerManager(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${apiUrl}/recruitmentsPerManager`);
}

 
getOpenPositionsByLocation(): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(`${apiUrl}/openPositionsByLocation`);
}


  getRecruitmentTrend(startYear: number, endYear: number): Observable<Map<string, Map<string, number>>> {
    return this.http.get<Map<string, Map<string, number>>>(`${apiUrl}}/recruitmentTrend/${startYear}/${endYear}`);
  }
  
  getRecruitmentByPostTitle(postTitle: string): Observable<Recruitment> {
    return this.http.get<Recruitment>(`${apiUrl}/getByPostTitle/${postTitle}`);
  }

  calculateExperienceMatching(idCandidate: number, postTitle: string): Observable<number> {
    return this.http.get<number>(`${apiUrl}/recruitment/candidate/${idCandidate}/${postTitle}/experience-matching`);
  }
}
