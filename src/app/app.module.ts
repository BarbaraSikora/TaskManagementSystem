import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksService } from './tasks.service';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import  Tasks  from './tasks';
import  { ArraySortPipe }  from './sort.pipe';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

/*export function tasksFactory() {

  const service = new TasksService();
  service['tasks'] = Tasks;
  return service;
}*/


@NgModule({
  declarations: [
    AppComponent,
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AsyncLocalStorageModule
  ],
  providers: [

      TasksService
      //useFactory: tasksFactory

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
