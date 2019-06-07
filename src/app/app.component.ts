import { Component } from '@angular/core';
import {Task} from './interfaces/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Task Management System';
  selectedTask: Task | {};
  postponedTask: Task | {};

  provideTaskToDetailsView(task: Task) {
    this.selectedTask = task;
  }

  provideTaskToActionsView(task: Task) {
    this.postponedTask = task;
  }

  closeDetailView(){
    this.selectedTask = null;
  }

  closeActionsView(){
    this.postponedTask = null;
  }

  ngOnInit() {
  }
}
