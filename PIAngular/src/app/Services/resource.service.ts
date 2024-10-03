import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resources } from 'src/app/Model/resources';
const baseUrl = 'http://localhost:8089/Resource'
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  addResource(resource: Resources): Observable<Resources> {
    const url = `${baseUrl}/addResource`;
    return this.http.post<Resources>(url, resource);
  }

  updateResource(resource: Resources): Observable<Resources> {
    const url = `${baseUrl}/update-Resource`;
    return this.http.put<Resources>(url, resource);
  }

  deleteResource(resourceId: number): Observable<void> {
    const url = `${baseUrl}/remove-resources/${resourceId}`;
    return this.http.delete<void>(url);
  }

  getAllResources(): Observable<Resources[]> {
    const url = `${baseUrl}/retrieve-all-Resources`;
    console.log('Fetching resources from:', url); // Ajoutez cette ligne
    return this.http.get<Resources[]>(url);
  }


  getResource(resourceId: number): Observable<Resources> {
    const url = `${baseUrl}/retrieve-Resource/project/${resourceId}`;
    return this.http.get<Resources>(url);
  }

  getResourceStats(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/stat`);
  }

  assignResourceToTask(resourceId: number, taskId: number): Observable<any> {
    const url = `${baseUrl}/${resourceId}/assignTask/${taskId}`;
    return this.http.post(url, {});
  }
  getResourcesForProject(projectId: number): Observable<Resources[]> {
    return this.http.get<Resources[]>(`${baseUrl}/project/${projectId}/resources`);
  }
}
