import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as dateFns from 'date-fns';
import { CalendarMonth, CalendarTableEntry } from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

@Component({
  selector: 'fs-calendar-table',
  templateUrl: './fs-calendar-table.component.html',
  styleUrls: ['./fs-calendar-table.component.scss'],
  host: {
    class: 'fs-calendar-table mat-mdc-card mdc-card mat-mdc-card-outlined mdc-card--outlined',
    'data-component-id': 'fs-calendar-table-unique',
  },
  standalone: false,
})
export class FsCalendarTableComponent implements OnInit {
  isLoading: boolean = true;

  private _monthNumber: number = dateFns.getMonth(new Date());
  private _yearNumber: number = dateFns.getYear(new Date());
  private _dataSource: CalendarTableEntry[] = [];

  currentMonth: CalendarMonth = this.calendarService.generateMonth(this._yearNumber, this._monthNumber, []);
  tableData: CalendarTableEntry[] = [];

  markWeekend = true;

  get dataSource(): CalendarTableEntry[] {
    return this._dataSource;
  }
  get month(): number {
    this.monthChange.emit(this._monthNumber);
    return this._monthNumber;
  }
  get year(): number {
    this.yearChange.emit(this._yearNumber);
    return this._yearNumber;
  }

  @Input()
  set dataSource(data: CalendarTableEntry[]) {
    this._dataSource = data;
    this.genMonthData();
  }

  @Input()
  set month(data: number) {
    this._monthNumber = data;
    this.genMonthData();
  }
  @Output() monthChange = new EventEmitter<number>();

  @Input()
  set year(data: number) {
    this._yearNumber = data;
    this.genMonthData();
  }
  @Output() yearChange = new EventEmitter<number>();

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.genMonthData();
    this.isLoading = false;
  }

  genMonthData() {
    this.currentMonth = this.calendarService.generateMonth(this._yearNumber, this._monthNumber, []);
    this._dataSource.forEach((item: CalendarTableEntry, index: number) => {
      this.tableData.splice(index, 1, {
        name: item.name,
        data: this.calendarService.generateMonth(this.year, this.month, item.data).days,
      });
    });
  }

  onMonthForward() {
    if (this._monthNumber >= 11) {
      this._yearNumber++;
      this._monthNumber = 0;
    } else {
      this._monthNumber++;
    }
    this.genMonthData();
  }

  onMonthBackward() {
    if (this._monthNumber <= 0) {
      this._yearNumber--;
      this._monthNumber = 11;
    } else {
      this._monthNumber--;
    }
    this.genMonthData();
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }
}
