import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultant } from '../models/consultant';

const baseUrl = 'http://localhost:8089/CRM' ;

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  constructor(private http: HttpClient) { }

  /*getConsultant(consultantId: number): Observable<Consultant> {
    return this.http.get<Consultant>(baseUrl+'/retrieve-consultant '+ consultantId);
  }*/
  /*getConsultant(): Observable<Consultant> {
    return this.http.get<Consultant>(baseUrl+'/retrieve-consultant' ); // Exemple d'URL de l'API à adapter selon votre configuration
  }
 */
  getConsultant(consultant_id: number) {
    return this.http.get<any>(`http://localhost:8089/CRM/retrieve-consultant/${consultant_id}`);
  }
  getAll(): Observable<Consultant[]> {
    
    return this.http.get<Consultant[]>(baseUrl + '/retrieve-all-consultant');
}

  addConsultant(consultant:Consultant):Observable<any>{
     return this.http.post<Consultant>(baseUrl+'/add-consultant',consultant)
     
}

  
updateConsultant(updatedConsultant: Consultant): Observable<Consultant> {
  return this.http.put<Consultant>(baseUrl+'/update-consultant', updatedConsultant);
}


removeConsultant(consultant_id: number): Observable<void> {
  return this.http.delete<void>(`${baseUrl}/remove-consultant/${consultant_id}`);
}
getSortedConsultants(sortBy: string): Observable<any[]> {
  return this.http.get<any[]>(`${baseUrl}/sorted/${sortBy}`);
}
affectconsultantToPortfolio( consultant_id: number,portfolio_id: number): Observable<any> {
  const url = `${baseUrl}/affecterportfolioAConsultant/${consultant_id}/${portfolio_id}`;
  return this.http.put<any>(url, {});
}
getTotalConsultants(): Observable<number> {
  return this.http.get<number>(`${baseUrl}/total`);
}
getHiredConsultantsCountThisMonth(): Observable<number> {
  return this.http.get<number>(`${baseUrl}/hiredCount`);
}
getConsultantsByGender(): Observable<any> {
  return this.http.get<any>(`${baseUrl}/gender`);
}

getConsultantsBySkill(): Observable<any> {
  return this.http.get<any>(`${baseUrl}/skill`);
}
getAllConsultants(): Observable<Consultant[]> {
  return this.http.get<Consultant[]>(`${baseUrl}/retrieve-skilled-consultant`);
}
getConsultantsStatistics(): Observable<any> {
  return this.http.get<any>(`${baseUrl}/statistics`);
}

}
