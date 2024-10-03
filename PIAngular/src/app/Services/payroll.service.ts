import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Payroll } from 'src/app/models/payroll';

const baseUrl = 'http://localhost:8089/Payroll';


@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(baseUrl + '/retrieve-all-payrolls');
  }

  addPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(baseUrl + '/add-payroll', payroll);
  }

  deletePayroll(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/remove-payroll/${id}`, { responseType: 'text' });
  }

  getPayroll(id: number): Observable<Payroll> {
    return this.http.get<Payroll>(`${baseUrl}/retrieve-payroll/${id}`);
  }

  affectPayroll(payroll: Payroll, userId: number): Observable<Payroll> {
    return this.http.put<Payroll>(`${baseUrl}/affect-payroll/${userId}`, payroll);
  }

  generatePdfPayroll(id: number): Promise<Blob|undefined> {
    return this.http.get(`${baseUrl}/pdfpayroll/${id}`, { responseType: 'blob' })
    .pipe(
      catchError(error => {
        // Handle the error here (e.g., log it, show a message to the user, etc.)
        console.error('Error generating PDF payroll:', error);
        return throwError(error); // Rethrow the error
      })
    )
    .toPromise();;
  }

  sendEmail(id: number): Observable<String> {
    return this.http.get<String>(`${baseUrl}/send-email/${id}`);
  }
  getTotalExpenses(year: number): Observable<any> {
    return this.http.get(`${baseUrl}/total-expenses?year=${year}`);
  }

  getTotalExpensesPerUser(year: number): Observable<any> {
    return this.http.get(`${baseUrl}/expenses-per-user?year=${year}`);
  }

  /* getTotalExpensesPerYear(year1: number, year2: number): Observable<any> {
    return this.http.get(`${baseUrl}/expenses-per-year?year=${year1}&year=${year2}`);
  } */

  getTotalExpensesPerYear(year1: number, year2: number): Observable<any> {
    return this.http.get(`${baseUrl}/expenses-per-year?startYear=${year1}&endtYear=${year2}`);
  }
 /*  getPayrollUser(payroll: number): Observable<any> {
    return this.http.get(`${baseUrl}/get-payroll-user/${payroll}`);
  } */
  getPayrollsByUser(user: number): Observable<any> {
    return this.http.get(`${baseUrl}/payrolls-by-user/${user}`);
  }

}
