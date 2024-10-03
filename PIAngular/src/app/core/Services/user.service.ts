import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/leav';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl  = "http://localhost:8089/user"; 
  
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/retrieve-users');
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get/${id}`);
  }

  getFirstName(user: User): string {
    return user.firstName;
  }

  getLastName(user: User): string {
    return user.lastName ? user.lastName : '';
  }




}