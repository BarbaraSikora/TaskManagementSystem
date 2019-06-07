import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import  { ArraySortPipe }  from './pipes/sort.pipe';
import { StorageModule    } from '@ngx-pwa/local-storage';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailedViewComponent } from './components/task-detailed-view/task-detailed-view.component';
import { TaskActionsViewComponent } from './components/task-actions-view/task-actions-view.component';


@NgModule({
  declarations: [
    AppComponent,
    ArraySortPipe,
    TaskListComponent,
    TaskDetailedViewComponent,
    TaskActionsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    })
  ],
  providers: [
      TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
