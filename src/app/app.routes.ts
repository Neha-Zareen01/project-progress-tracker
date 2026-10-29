import { Routes } from '@angular/router';
import { ProjectCrud } from './project-crud/project-crud';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectCrud },
];