import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css',
})
export class ProgressNotes {
  projectCodes: Record<string, string> = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard',
    SQL505: 'Database Design Project',
    CLD606: 'Cloud Deployment Pipeline',
  };

  codeList = Object.keys(this.projectCodes);

  codeNotFound = false;

  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('On Track'),
    teamMember: new FormControl(''),
    progressNote: new FormControl(''),
  });

  constructor() {
    // Hide the error message as soon as the user edits the Project Code
    this.progressNotesForm.controls.projectCode.valueChanges.subscribe(() => {
      this.codeNotFound = false;
    });
  }

  findProjectName(code: string): string | undefined {
    return this.projectCodes[code.trim().toUpperCase()];
  }

  onProjectCodeChange() {
    const code = this.progressNotesForm.controls.projectCode.value ?? '';
    const name = this.findProjectName(code);

    if (name) {
      this.progressNotesForm.controls.projectName.setValue(name);
      this.codeNotFound = false;
    } else {
      this.progressNotesForm.controls.projectName.setValue('');
      this.codeNotFound = code.trim() !== '';
    }
  }
}