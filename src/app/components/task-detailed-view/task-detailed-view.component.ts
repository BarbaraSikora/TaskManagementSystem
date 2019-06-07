import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-detailed-view',
  templateUrl: './task-detailed-view.component.html',
  styleUrls: ['./task-detailed-view.component.css']
})
export class TaskDetailedViewComponent implements OnInit {
  submitted = false;
  saved = false;
  @Input() selected: Task;

  @Output() closeTask: EventEmitter<null> = new EventEmitter();

  constructor(private service: TasksService) {}

  ngOnInit() {

  }

  closeDetailView() {
    this.closeTask.emit();
    this.saved = false;
  }

  onSave(){
    this.submitted = true;

    this.selected['dueDate'] = new Date(this.selected['dueDate']);
    this.selected['resolvedAt'] = new Date(this.selected['resolvedAt']);

    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.selected['id'] == task['id']);
      tasks[key] = Object.assign({}, this.selected);

      this.service.updateTasks(tasks).subscribe(() => {
        this.saved = true;
      }, () => {});
    }, () => {});
  }

}
