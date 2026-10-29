import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectApi } from '../project-api';
import { Project } from '../project';

@Component({
  selector: 'app-project-crud',
  imports: [RouterLink],
  templateUrl: './project-crud.html',
  styleUrl: './project-crud.css',
})
export class ProjectCrud implements OnInit {
  private api = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.api.getProjects().subscribe((data) => {
      this.projects = data;
      this.cdr.detectChanges();
    });
  }

  onDelete(projectId: string): void {
    this.api.deleteProject(projectId).subscribe(() => {
      this.projects = this.projects.filter((p) => p._id !== projectId);
      this.cdr.detectChanges();
    });
  }
}