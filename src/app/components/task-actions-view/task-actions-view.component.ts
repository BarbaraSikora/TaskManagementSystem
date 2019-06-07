import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-actions-view',
  templateUrl: './task-actions-view.component.html',
  styleUrls: ['./task-actions-view.component.css']
})
export class TaskActionsViewComponent implements OnInit {
  postpone = false;
  @Input() postponed: Task;
  @Output() closeTaskActions: EventEmitter<null> = new EventEmitter();

  constructor(private service: TasksService) {}

  ngOnInit() {
  }

  postponeTask(){
    this.postponed['dueDate'] = new Date(this.postponed['dueDate']);

    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.postponed['id'] == task['id']);
      tasks[key]['dueDate'] = this.postponed['dueDate'];
      this.service.updateTasks(tasks).subscribe(() => {
        this.postpone = false;
        this.closePostpone();
      }, () => {});
    }, () => {});
  }

  closePostpone(){
    this.closeTaskActions.emit();
  }

  removeTask(){
    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.postponed['id'] == task['id']);
      tasks.splice(key, 1);
      this.service.updateTasks(tasks).subscribe(() => {
        this.closePostpone();
      }, () => {});
    }, () => {});
  }
}
