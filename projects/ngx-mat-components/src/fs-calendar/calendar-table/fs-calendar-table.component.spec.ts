/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FsCalendarTableComponent } from './fs-calendar-table.component';

describe('FsCalendarTableComponent', () => {
  let component: FsCalendarTableComponent;
  let fixture: ComponentFixture<FsCalendarTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FsCalendarTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsCalendarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
