import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectApi } from '../project-api';
import { Project } from '../project';

@Component({
  selector: 'app-project-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './project-crud.html',
  styleUrl: './project-crud.css',
})
export class ProjectCrud implements OnInit {
  private api = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  projects: Project[] = [];
  selectedProject: Project | null = null;
  editingId: string | null = null;

  projectForm = this.fb.nonNullable.group({
    projectName: '',
    description: '',
    startDate: '',
    status: 'Not Started',
    teamMember: '',
    progressNote: '',
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.api.getProjects().subscribe((data) => {
      this.projects = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    const data = this.projectForm.getRawValue();

    if (this.editingId) {
      this.api.updateProject(this.editingId, data).subscribe(() => {
        this.resetForm();
        this.loadProjects();
      });
    } else {
      this.api.addProject(data).subscribe(() => {
        this.resetForm();
        this.loadProjects();
      });
    }
  }

  onEdit(project: Project): void {
    this.editingId = project._id;
    this.projectForm.patchValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate.substring(0, 10),
      status: project.status,
      teamMember: project.teamMember,
      progressNote: project.progressNote,
    });
  }

  onView(projectId: string): void {
    this.api.getProject(projectId).subscribe((project) => {
      this.selectedProject = project;
      this.cdr.detectChanges();
    });
  }

  onDelete(projectId: string): void {
    this.api.deleteProject(projectId).subscribe(() => {
      if (this.selectedProject?._id === projectId) {
        this.selectedProject = null;
      }
      if (this.editingId === projectId) {
        this.resetForm();
      }
      this.projects = this.projects.filter((p) => p._id !== projectId);
      this.cdr.detectChanges();
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.projectForm.reset();
  }
}