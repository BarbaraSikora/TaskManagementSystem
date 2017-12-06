import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import  Tasks  from './tasks';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class TasksService {

    constructor(protected localStorage: AsyncLocalStorage) { }

    private tasks = Tasks;

    setTasks() {
        this.localStorage.setItem('tasks', this.tasks).subscribe(() => {}, () => {});
    }

    setID(){
        this.localStorage.setItem('actualID', this.tasks.length).subscribe(() => {}, () => {});
    }


    getID(): Observable<any>{
        return this.localStorage.getItem('actualID');
    }

    updateID(id){
        this.localStorage.setItem('actualID', id).subscribe(() => {}, () => {});
    }

    clearStorage(){
        return this.localStorage.clear();
    }

    updateTasks(tasks){
        return this.localStorage.setItem('tasks', tasks);
    }

    getTasks(): Observable<any>{
            return this.localStorage.getItem('tasks');
    }
}