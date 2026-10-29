import { Routes } from '@angular/router';
import { ProjectCrud } from './project-crud/project-crud';
import { ProjectForm } from './project-form/project-form';

export const routes: Routes = [
  { path: 'projects', component: ProjectCrud },
  { path: 'projects/new', component: ProjectForm },
  { path: 'projects/edit/:id', component: ProjectForm },
];