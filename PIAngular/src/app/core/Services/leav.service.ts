import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leav } from '../Models/leav';
import { User } from '../Models/leav';


const apiUrl = 'http://localhost:8089/leav';

@Injectable({
  providedIn: 'root'
})
export class LeavService {
  constructor(private http: HttpClient) { }

  createLeav(leav: Leav): Observable<any> {
    return this.http.post<any>(apiUrl + '/addLeav', leav);
  }

  getLeavs(): Observable<Leav[]> {
    return this.http.get<Leav[]>(apiUrl + '/allLeavs');
  }
  
  getLeavById(leaveId: number): Observable<Leav> { // Make sure to specify return type as Observable<Leav>
    return this.http.get<Leav>(`${apiUrl}/get/${leaveId}`); // Use template literals for dynamic URL
  }

  
  updateLeav(updatedLeav: Leav): Observable<Leav> {
    return this.http.put<Leav>(`${apiUrl}/updateLeav`, updatedLeav);
  }
  deleteLeav(leaveId: number): Observable<any> {
    return this.http.delete(`${apiUrl}/delete/${leaveId}`);
  }
  getNotifications(): Observable<any> {
    return this.http.get<any>(`${apiUrl}/notifications`);
  }
  
  getUserByLeavId(leaveId: number ): Observable<any> {
    return this.http.get(`${apiUrl}/${leaveId}/userByLeave`); 
  }
  getLeaveIdByDate(leaveStartdate: String): Observable<number> {
    return this.http.get<number>(`${apiUrl}/leaveIdByDate/${leaveStartdate}`);
}
getLeavsForUser(id: number): Observable<Leav[]> {
  return this.http.get<Leav[]>(`${apiUrl}/user/${id}`);
}
getLeaveStatistics(): Observable<any> {
  return this.http.get<any>(`${apiUrl}/statistics`);
}
assignLeavToUser(leaveId: number,id: number): Observable<any> {
  return this.http.put<any>(`${apiUrl}/assignLeavToUser/${leaveId}/${id}`,null);
}


acceptLeaveRequest(leaveId: number): Observable<Leav> {
  return this.http.put<Leav>(`${apiUrl}/accept/${leaveId}`, null);
}

refuseLeave(leaveId: number): Observable<any> {
  return this.http.put<any>(`${apiUrl}/${leaveId}/refuse`, {});
}


calculateLeaveDuration(startDate: string, endDate: string): Observable<number> {
  return this.http.get<number>(`${apiUrl}/leave/duration/${startDate}/${endDate}`);
}

}
