import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ClientRoutingModule } from 'src/app/views/front/client/client-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8089/user'; // Mettez votre URL d'API ici
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient  ) { }

  getCompletedProjectsStatistics(): Observable<any> {
    
    return this.http.get<any>(`http://localhost:8089/Project/completed-future`);
  }
  // Récupérer les données de profil de l'utilisateur
  getUserProfile(): Observable<any> {
    console.log("getting user profile")
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null
    console.log(userObj?.token)
    const token = userObj?.token || null
  
    // Check if token exists
    if (!token) {
     
      console.error('Token not found in local storage');
      throw new Error('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
  console.log("token",token)
    // Make HTTP request with headers
    return this.http.get<any>(`${this.baseUrl}/getCurrent`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  // Gestion des erreurs HTTP
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log error in the console
    return throwError(error); // Throw an error to the caller
  }

  updateUser(userData: any): Observable<any> {
    const userId = this.getLoggedInUserId();
    
    if (userId) {
      return this.http.put(`${this.baseUrl}/update/${userId}`, userData);
    } else {
      return throwError('Update failed: User not logged in');
    }
  }

  getLoggedInUserId(): number {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }

  downloadProfilePdf(): Observable<Blob> {
    return this.http.get(`http://localhost:8089/download/profile`, { responseType: 'blob' });
  }



}

