import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProgressNotes } from './progress-notes/progress-notes';
import { MilestoneApi } from './milestone-api/milestone-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MilestoneTracker, ProgressNotes, MilestoneApi],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project Progress Tracker');
}