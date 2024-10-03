import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prime } from '../models/prime';

const baseUrl = 'http://localhost:8089/prime';

@Injectable({
  providedIn: 'root'
})

export class PrimeService {
  

  constructor(private http: HttpClient) { }

  getAll(): Observable<Prime[]> {
    return this.http.get<Prime[]>(baseUrl + '/retrieve-all-primes');
  }

  addPrime(prime: Prime): Observable<Prime> {
    return this.http.post<Prime>(baseUrl + '/add-prime', prime);
  }

  deletePrime(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/remove-prime/${id}`, { responseType: 'text' });
  }

  getPrime(id: number): Observable<Prime> {
    return this.http.get<Prime>(`${baseUrl}/retrieve-prime/${id}`);
  }

  affectPrime(prime: Prime, userId: number): Observable<Prime> {
    return this.http.put<Prime>(`${baseUrl}/affect-prime/${userId}`, prime);
  }
}
