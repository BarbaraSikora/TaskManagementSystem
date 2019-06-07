import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  selected: Task | {};
  postponed: Task | {};
  tasks: Task[];
  actualID;
  saved = false;

  @Output() setTask: EventEmitter<Object> = new EventEmitter();
  @Output() openTaskActions: EventEmitter<Object> = new EventEmitter();
  @Output() closeTask: EventEmitter<null> = new EventEmitter();
  @Output() closeTaskActions: EventEmitter<null> = new EventEmitter();

  constructor(private service: TasksService) {}

  ngOnInit() {
    this.updateList();
  }

  addRandomTask(){
    let dueDate = this.generateRandomDate();
    let resolvedAt = this.generateRandomDate();
    let randomPrio = Math.floor((Math.random() * 20) + 1);

    this.service.getID().subscribe((id) => {
      if(id == null){
        id = 0;
      }
      this.actualID = id;

      let task = {
        'id':this.actualID,
        'title':'Mock Title '+this.actualID,
        'description':'Mock Description',
        'dueDate':new Date(dueDate),
        'resolvedAt': new Date(resolvedAt),
        'priority':randomPrio,
        'status':'Mock Status'

      };
      this.service.updateID(this.actualID+1);
      this.service.getTasks().subscribe((tasks) => {
        if(tasks !== null){
          tasks.push(task);
        }else{
          tasks = [];
          tasks.push(task);
        }
        this.service.updateTasks(tasks).subscribe(() => {
          this.tasks = tasks;
        }, () => {});
      }, () => {});
    }, () => {});
  }

  generateRandomDate(){
    let randomYear = Math.floor((Math.random() * (2018 - 2017 + 1)) + 2017);
    let randomMonth = Math.floor((Math.random() * 12) + 1);
    let randomDay = Math.floor((Math.random() * 31) + 1);

    return  randomYear + '-' + randomMonth + '-' + randomDay;
  }

  cleanStorage(){
    this.service.clearStorage().subscribe(() => {
      this.tasks = null;
      this.actualID = null;
      this.closeDetailView();
      this.closePostpone();
    });
  }

  selectTask(task) {
    this.selected = Object.assign({}, task);    // prevent changing original object
    this.saved = false;
    this.setTask.emit(this.selected);
    this.closePostpone();
  }

  openActions(task){
    this.closeDetailView();
    this.postponed = task;
    this.openTaskActions.emit(this.postponed);
  }

  updateList() {
    this.service.getTasks().subscribe((tasks) => {
      if (tasks !== null) {                        // tasks found in localStorage
        this.tasks = tasks;
      } else {
        this.service.setTasks();                 // no tasks in localStorage
        this.service.setID();
        this.ngOnInit();
      }
    }, () => {});
  }

  closeDetailView() {
    this.selected = null;
    this.closeTask.emit();
  }

  closePostpone(){
    this.postponed = null,
    this.closeTaskActions.emit();
  }
}
