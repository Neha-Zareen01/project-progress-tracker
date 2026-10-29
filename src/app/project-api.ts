import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectInput } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8001/projects';

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  addProject(project: ProjectInput): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: string, project: Partial<ProjectInput>): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}