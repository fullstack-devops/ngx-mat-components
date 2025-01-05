/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalendarPanelsComponent } from './calendar-panels.component';

describe('CalendarPanelsComponent', () => {
  let component: CalendarPanelsComponent;
  let fixture: ComponentFixture<CalendarPanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarPanelsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
