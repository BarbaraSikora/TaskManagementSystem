import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailedViewComponent } from './task-detailed-view.component';

describe('TaskDetailedViewComponent', () => {
  let component: TaskDetailedViewComponent;
  let fixture: ComponentFixture<TaskDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDetailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
