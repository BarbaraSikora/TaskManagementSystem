import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  { Tasks } from './tasks';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class TasksService {

    constructor(protected localStorage: AsyncLocalStorage) { }

    private tasks = Tasks;

    //initiate dummy tasks list and save in localStorage
    setTasks() {
        this.localStorage.setItem('tasks', this.tasks).subscribe(() => {}, () => {});
    }

    //initiate first ID and save in localStorage
    setID(){
        this.localStorage.setItem('actualID', this.tasks.length).subscribe(() => {}, () => {});
    }

    //get actualID for the next Task
    getID(): Observable<any>{
        return this.localStorage.getItem('actualID');
    }

    //updates the ID in the  localStorage to save the current ID
    updateID(id){
        this.localStorage.setItem('actualID', id).subscribe(() => {}, () => {});
    }

    //remove all variables stored in localStorage
    clearStorage(){
        return this.localStorage.clear();
    }

    //updates the tasks in the localStorage
    updateTasks(tasks){
        return this.localStorage.setItem('tasks', tasks);
    }

    //get all tasks from the localStorage
    getTasks(): Observable<any>{
            return this.localStorage.getItem('tasks');
    }
}
