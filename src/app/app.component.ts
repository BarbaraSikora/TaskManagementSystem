import { Component } from '@angular/core';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Task Management System';
  selected: Task | {};
  postponed: Task | {};

  actualID;
  submitted = false;
  saved = false;
  postpone = false;

  tasks: Task[];

  constructor(private service: TasksService) {}

  ngOnInit(){

   this.service.getTasks().subscribe((tasks) => {
     if(tasks !== null){                        // tasks found in localStorage
       this.tasks = tasks;

     }else{
       this.service.setTasks();                 // no tasks in localStorage
       this.service.setID();
       this.ngOnInit();
     }
   }, () => {});
  }


  selectTask(task){
    this.selected = Object.assign({}, task);    // avoids changing original object
    this.saved = false;
    this.closePostpone();
  }

  onSave(){
    this.submitted = true;

    this.selected['dueDate'] = new Date(this.selected['dueDate']);
    this.selected['resolvedAt'] = new Date(this.selected['resolvedAt']);

    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.selected['id'] == task['id']);
      tasks[key] = Object.assign({}, this.selected);

      this.service.updateTasks(tasks).subscribe(() => {
        this.tasks = tasks;
        this.saved = true;
      }, () => {});
    }, () => {});
  }

  cleanStorage(){
    this.service.clearStorage().subscribe(() => {
      this.tasks = null;
      this.actualID = null;
      this.closeDetailView();
      this.closePostpone();
    });
  }

  generateRandomDate(){
    let randomYear = Math.floor((Math.random() * (2018 - 2017 + 1)) + 2017);
    let randomMonth = Math.floor((Math.random() * 12) + 1);
    let randomDay = Math.floor((Math.random() * 31) + 1);

    return  randomYear+"-"+randomMonth+"-"+randomDay;
  }

  addRandomTask(){
    let dueDate = this.generateRandomDate();
    let resolvedAt = this.generateRandomDate();
    let randomPrio = Math.floor((Math.random() * 20) + 1);

   this.service.getID().subscribe((id) => {
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
            this.service.updateTasks(tasks).subscribe(() => {
              this.tasks = tasks;
            }, () => {});
          }
      }, () => {});
   }, () => {});
  }


  closeDetailView(){
    this.selected = null;
  }

  closePostpone(){
    this.postponed = null;
  }

  toPostpone(task){
    this.closeDetailView();
    this.postponed = task;
  }

  removeTask(){
    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.postponed['id'] == task['id']);
      tasks.splice(key,1);
      this.service.updateTasks(tasks).subscribe(() => {
        this.tasks = tasks;
        this.closePostpone();
      }, () => {});
    }, () => {});
  }

  postponeTask(){
    this.postponed['dueDate'] = new Date(this.postponed['dueDate']);

    this.service.getTasks().subscribe((tasks) => {
      let key = tasks.findIndex(task => this.postponed['id'] == task['id']);
      tasks[key]['dueDate'] = this.postponed['dueDate'];
      this.service.updateTasks(tasks).subscribe(() => {
        this.tasks = tasks;
        this.postpone = false;
        console.log(tasks);
        this.closePostpone();
      }, () => {});
    }, () => {});
  }



}
