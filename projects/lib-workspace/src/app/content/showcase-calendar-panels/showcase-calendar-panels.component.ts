import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CalendarEvent, CalendarExtendedDay, CalendarPanels, CalendarPanelsConfig, FsCalendarModule } from 'projects/ngx-mat-components/src/public-api';

interface CustomTestObj {
  id: number;
  name: string;
}

@Component({
  selector: 'app-showcase-calendar-panels',
  imports: [CommonModule, FormsModule, FsCalendarModule, MatSlideToggleModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './showcase-calendar-panels.component.html',
  styleUrls: ['./showcase-calendar-panels.component.scss'],
})
export class ShowcaseCalendarPanelsComponent implements OnInit {
  range: any;

  placeholder = false; // boolean
  isLoading = true;
  latestEvent: Object | undefined;

  today = new Date();
  todayMonth = this.today.getMonth();
  todayYear = this.today.getFullYear();

  monthsAfterBefore = Array(5)
    .fill(0)
    .map((x, i) => i);
  monthsBefore = 1;
  monthsAfter = 1;

  // monthsBefore = new FormControl(1);
  // monthsAfter = new FormControl(1);

  calendarConfig: CalendarPanelsConfig = {
    renderMode: 'monthly', // 'annual' | 'monthly'
    selectMode: 'range', // 'click' | 'range'
    displayYear: true,
    firstDayOfWeekMonday: true,
    calendarWeek: true,
    switches: true,
    panelWidth: '300px',
    bluredDays: false, // default: false
    markWeekend: true, // default: true
  };

  calendarData: CalendarExtendedDay<CustomTestObj>[] = [
    {
      date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
      colors: {
        backgroundColor: '#0167c7',
      },
      toolTip: 'Test ToolTip First',
    },
    {
      date: new Date(this.today.getFullYear(), this.today.getMonth(), 3),
      colors: {
        backgroundColor: 'rgb(6, 182, 0)',
      },
      toolTip: 'Test ToolTip Second',
    },
    {
      date: new Date(this.today.getFullYear(), this.today.getMonth(), 13),
      colors: {
        backgroundColor: 'rgb(6, 182, 0)',
      },
      toolTip: 'Test ToolTip 2',
      customData: {
        id: 1,
        name: 'test',
      },
    },
    {
      date: new Date(this.today.getFullYear(), this.today.getMonth(), 25),
      colors: {
        backgroundColor: 'lightblue',
      },
    },
  ];
  dataSource: CalendarPanels<CustomTestObj> = {
    config: this.calendarConfig,
    data: this.calendarData,
  };

  constructor() {}
  ngOnInit(): void {
    console.log('ShowcaseCalendarPanelsComponent initialized', this.dataSource);
    this.isLoading = false;
  }

  /**
   * Handles calendar events by updating the `range` property based on the event type.
   *
   * @param event - The calendar event object containing event details. The event can be of type 'range' or 'click'.
   *   - If the event type is 'range', the method updates the `range` property with the event data.
   *   - If the event type is 'click', the method also updates the `range` property with the event data.
   *   - The event object may contain additional information such as start and end dates, or metadata relevant to the calendar interaction.
   *
   * Logs the received event to the console for debugging purposes.
   */
  testMethod(event: CalendarEvent) {
    switch (event.type) {
      case 'range':
        this.range = event;
        break;
      case 'click':
        this.range = event;
        break;
    }
    console.log('Received event:', event);
  }
}
