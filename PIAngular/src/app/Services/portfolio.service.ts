import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { User } from '../models/user';

const baseUrl = 'http://localhost:8089/PORTFOLIO' ;
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Portfolio[]> {
    
    return this.http.get<Portfolio[]>(baseUrl + '/retrieve-all-portfolio');
}
getportfilioWithoutConsultant(): Observable<Portfolio[]> {
    
  return this.http.get<Portfolio[]>(baseUrl + '/retrieve-all-portfoliononaffectes');
}
addPortfolio(portfolio:Portfolio):Observable<any>{
  return this.http.post<Portfolio>(baseUrl+'/add-Portfolio',portfolio)
}
removePortfolio(portfolio_id: number): Observable<void> {
  return this.http.delete<void>(`${baseUrl}/remove-portfolio/${portfolio_id}`);
}
getPortfolio(portfolio_id: number) {
  return this.http.get<any>(`http://localhost:8089/PORTFOLIO/retrieve-Portfolio/${portfolio_id}`);
}
affectUserToPortfolio(portfolio_id: number, user_id: number): Observable<any> {
  const url = `${baseUrl}/affceter/${portfolio_id}/${user_id}`;
  return this.http.put<any>(url, {});
}

getPortfolioEvolution(portfolioId: number): Observable<any> {
  return this.http.get<any>(`${baseUrl}/evolution/${portfolioId}`);
}
getMeetingsCountThisMonth(): Observable<number> {
  return this.http.get<number>(`${baseUrl}/meetingsCount`);
}
getPortfoliosCountByDomain(): Observable<any> {
  return this.http.get<any>(`${baseUrl}/countByDomain`);
}
getUsersByPortfolioId(portfolioId: number): Observable<User[]> {
  return this.http.get<User[]>(`${baseUrl}/${portfolioId}/users`);
}
getUsersnonAffectePortfolio(): Observable<User[]> {
  return this.http.get<User[]>(`${baseUrl}/non-affectes`);
}

desaffectUserToPortfolio(userId: number, portfolioId: number): Observable<void> {
  return this.http.put<void>(`${baseUrl}/disaffceter/${portfolioId}/${userId}`, {});
}
}
