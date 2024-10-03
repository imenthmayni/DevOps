import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Task } from '../Model/task';


const baseUrl = 'http://localhost:8089/Task'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl+'/retrieve-all-task');
  }
  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${baseUrl}/addTask`, newTask);
  }
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${baseUrl}/update-task`, updatedTask);
  }
  deleteTask(taskId: number): Observable<void> {
    const url = `${baseUrl}/remove-task/${taskId}`;
    return this.http.delete<void>(url);
  }
  
  assignTaskToProject(projectId: number, taskId: number): Observable<Task> {
    return this.http.post<Task>(`${baseUrl}/${taskId}/assign-to-project/${projectId}`, null);
  }
  assignTaskToUser(taskId: number, userId: number): Observable<any> {
    const url = `${baseUrl}/${taskId}/assign-to-user/${userId}`;
    return this.http.post(url, {});
  }
  calculateTaskBudget(taskId: number): Observable<number> {
    const url = `${baseUrl}/${taskId}/calculate-budget`; // Utilisez la bonne syntaxe pour construire l'URL
    return this.http.get<number>(url);
  }
  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/retrieve-task/${taskId}`);
  }
}
