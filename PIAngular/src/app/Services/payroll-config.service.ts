import { Injectable } from '@angular/core';
import { PayrollConfig } from '../models/payroll-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8089/payroll-config';

@Injectable({
  providedIn: 'root'
})
export class PayrollConfigService {

  constructor(private http: HttpClient) { }

  getPayrollConfig(id: number): Observable<PayrollConfig> {
    return this.http.get<PayrollConfig>(`${baseUrl}/retrieve-config/${id}`);
  }

  updatePayrollConfig(payrollConfig: PayrollConfig, id: number): Observable<PayrollConfig> {
    return this.http.put<PayrollConfig>(`${baseUrl}/update-config/${id}`, payrollConfig);
  }
}
