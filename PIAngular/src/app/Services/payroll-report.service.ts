import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8089/report';

@Injectable({
  providedIn: 'root'
})
export class PayrollReportService {

  constructor(private http: HttpClient) { }

  generateExcel(year: number): Observable<Blob> {
    return this.http.get(`${baseUrl}/excel/all?year=${year}`, {
      responseType: 'blob', // Specify response type as blob
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  orderPaymentPdf(year: number, month: string, accountNumber: number, paymentDate: string): Observable<Blob>{
    return this.http.get(`${baseUrl}/pdf/order-payment?year=${year}&month=${month}&accountNumber=${accountNumber}&paymentDate=${paymentDate}`, {
      responseType: 'blob', // Specify response type as blob
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }
}
