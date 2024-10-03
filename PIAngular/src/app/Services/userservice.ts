import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/user'; // Assurez-vous de spécifier le chemin correct

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8089/user'; // Remplacez l'URL par celle de votre API

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/alluser`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/retrieve-users`);
  }



}