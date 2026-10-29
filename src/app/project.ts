export interface Project {
  _id: string;
  projectName: string;
  description: string;
  startDate: string;
  status: string;
  teamMember: string;
  progressNote: string;
}

export type ProjectInput = Omit<Project, '_id'>;