import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskActionsViewComponent } from './task-actions-view.component';

describe('TaskActionsViewComponent', () => {
  let component: TaskActionsViewComponent;
  let fixture: ComponentFixture<TaskActionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskActionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskActionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
