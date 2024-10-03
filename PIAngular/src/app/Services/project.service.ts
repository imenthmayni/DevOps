import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../Model/project';
import { User } from '../Model/user';
import { Task, TaskStatus } from '../Model/task';


const baseUrl = 'http://localhost:8089/Project'
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(baseUrl + '/retrieve-all-project');
  }
  addProject(newProject: Project | any): Observable<Project> {
    return this.http.post<Project>(`${baseUrl}/addProject`, newProject);
  }
  updateProject(updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${baseUrl}/update-project`, updatedProject);
}


  deleteProject(projectId: number): Observable<void> {
    const url = `http://localhost:8089/Project/remove-project/${projectId}`;
    return this.http.delete<void>(url);
  }
  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${baseUrl}/retrieve-project/${projectId}`);
  }

  getProjectTeam(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/projects/${projectId}/team`);
  }
  getCompletedTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/${projectId}/completed-tasks`);
  }
  calculateCompletionPercentage(projectId: number): Observable<number> {
    return this.http.get<number>(`${baseUrl}/project/${projectId}/completionPercentage`);
  }
  getTaskStatusDistribution(projectId: number): Observable<Map<TaskStatus, number>> {
    return this.http.get<Map<TaskStatus, number>>(`${baseUrl}/${projectId}/status-distribution`);
  }
  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/project/${projectId}`);
  }
  calculateProjectBudget(projectId: number): Observable<number> {
    const url = `${baseUrl}/${projectId}/budget`;
    return this.http.get<number>(url);}

    getDelayedProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(`${baseUrl}/delayed`);
  }
  getCompletedFutureProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}/completed-future`);
  }
  getCompletedFutureProjectsPercentage(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/completed-future-percentage`);
  }


  getProjectsForCurrentUser(): Observable<Project[]> {
    return this.http.get<Project[]>(`${baseUrl}/current-user`);
  }


}
