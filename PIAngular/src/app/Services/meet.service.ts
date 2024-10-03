import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../models/meeting';

const baseUrl = 'http://localhost:8089/meet' ;

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  constructor(private http: HttpClient) { }
  
  retrieveAllMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${baseUrl}/retriveMeetings`);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${baseUrl}/addMeet`, meeting);
  }

  updateMeeting(meetId: number, meeting: Meeting): Observable<Meeting> {
    return this.http.put<Meeting>(`${baseUrl}/${meetId}`, meeting);
  }

  getMeetingById(meetId: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${baseUrl}/${meetId}`);
  }

  deleteMeeting(meetId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${meetId}/annuler`);
  }

  planifierMeeting(meeting: Meeting, consultantId: number,userId: number): Observable<Meeting> {
    return this.http.post<Meeting>(`${baseUrl}/planifier/${consultantId}/${userId}`, meeting);
  }

  refuserMeeting(meetId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${meetId}/refuser`, null);
  }
  validerMeeting(meetId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${meetId}/valider`, null);
  }

  annulerMeet(meetId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${meetId}/annuler`, null);
  }
  affecter(meetId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${meetId}/affecter`, null);
  }
  getMeetingCounts(consultantId: number, dateBegin: string, dateEnd: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${consultantId}/${dateBegin}/${dateEnd}`);
  }
  retrieveMeetings(consultantId: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${baseUrl}/meetings/${consultantId}`);
  }
  getuserMeetings(userId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/Pendingmeetings/${userId}`);
  }
  getuserMeet(userId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/meeeets/${userId}`);
  }
  getMeetingStats(consultantId: number, startDate: string, endDate: string): Observable<any> {
    const params = {
      consultantId: consultantId,
      startDate: startDate,
      endDate: endDate
    };
    return this.http.get(`${baseUrl}/stats/${consultantId}`, { params });
 }
 fetchMonthlyMeetingStats(consultantId: number): Observable<Map<string, Map<string, number>>> {
  return this.http.get<Map<string, Map<string, number>>>(`${baseUrl}/statss/${consultantId}`);
}
}
