import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FsCalendarModule, FsCalendarTableComponent } from 'ngx-mat-components';
import { CalendarTableEntry } from 'projects/ngx-mat-components/src/public-api';

@Component({
  selector: 'app-showcase-calendar-table',
  imports: [CommonModule, MatCardModule, FsCalendarModule],
  templateUrl: './showcase-calendar-table.component.html',
})
export class ShowcaseCalendarTableComponent implements OnInit {
  today = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();

  calTableData: CalendarTableEntry[] = [
    {
      name: 'Test User',
      data: [
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 20),
          toolTip: 'Some longer text',
          char: '',
          colors: {
            backgroundColor: '#FFFFFF',
            color: '#000',
          },
        },
      ],
    },
    {
      name: 'Test User 2',
      data: [
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
          toolTip: 'Some text',
          char: 'T',
          colors: {
            backgroundColor: '#FFFFFF',
            color: '#000',
          },
        },
        {
          date: new Date(this.today.getFullYear(), this.today.getMonth(), 11),
          toolTip: 'Some text',
          char: 'U',
          colors: {
            backgroundColor: '#22ff0e',
            color: '#000',
          },
        },
      ],
    },
    {
      name: 'Test User 3',
      data: [],
    },
    {
      name: 'Test User 4',
      data: [],
    },
    {
      name: 'Test User 5',
      data: [],
    },
    {
      name: 'Test User 6',
      data: [],
    },
    {
      name: 'Test User 7',
      data: [],
    },
    {
      name: 'Test User 8',
      data: [],
    },
    {
      name: 'Test User 9',
      data: [],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
