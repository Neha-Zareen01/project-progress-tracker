import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectApi } from '../project-api';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ProjectApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projectId: string | null = null;

  projectForm = this.fb.nonNullable.group({
    projectName: '',
    description: '',
    startDate: '',
    status: 'Not Started',
    teamMember: '',
    progressNote: '',
  });

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {
      this.api.getProject(this.projectId).subscribe((project) => {
        this.projectForm.patchValue({
          projectName: project.projectName,
          description: project.description,
          startDate: project.startDate.substring(0, 10),
          status: project.status,
          teamMember: project.teamMember,
          progressNote: project.progressNote,
        });
      });
    }
  }

  onSubmit(): void {
    const data = this.projectForm.getRawValue();

    if (this.projectId) {
      this.api.updateProject(this.projectId, data).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    } else {
      this.api.addProject(data).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}