import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksService } from './tasks.service';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import  { ArraySortPipe }  from './sort.pipe';
import { StorageModule    } from '@ngx-pwa/local-storage';


@NgModule({
  declarations: [
    AppComponent,
    ArraySortPipe
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
