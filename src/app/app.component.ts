import { Component } from '@angular/core';
import {Task} from './interfaces/task';
import { TasksService } from './services/tasks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskList: Task[];
  title = 'Task Management System';
  selectedTask: Task | {};
  postponedTask: Task | {};

  constructor(private service: TasksService) {}

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

  updateList() {
    this.service.getTasks().subscribe((tasks) => {
      if (tasks !== null) {                        // tasks found in localStorage
        this.taskList = tasks;
      } else {
        this.service.setTasks();                 // no tasks in localStorage
        this.service.setID();
        this.ngOnInit();
      }
    }, () => {});
  }

  ngOnInit() {
    this.updateList();
  }
}
