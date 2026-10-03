import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProgressNotes } from './progress-notes/progress-notes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MilestoneTracker, ProgressNotes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project Progress Tracker');
}