import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8089/contact/send';

  constructor(private http: HttpClient) { }

  sendEmail(formData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new HttpParams();
    params = params.set('name', formData.name);
    params = params.set('email', formData.email);
    params = params.set('subject', formData.subject);
    params = params.set('messageBody', formData.messageBody);

    return this.http.post(this.apiUrl, params.toString(), { headers });
  }
}
