import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import * as dateFns from 'date-fns';
import { CalendarEvent, CalendarExtendedDay, CalendarPanels, CalendarPanelSum } from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

@Component({
    selector: 'fs-calendar-panels',
    templateUrl: './calendar-panels.component.html',
    styleUrls: ['./calendar-panels.component.scss'],
    host: {
        class: 'fs-calendar-panels',
    },
    standalone: false
})
export class FsCalendarPanelsComponent implements OnInit {
  private _dataSource: CalendarPanels<any> = {
    config: {
      renderMode: 'monthly',
      selectMode: 'click',
      displayYear: true,
      firstDayOfWeekMonday: true,
      calendarWeek: false,
      switches: true,
      bluredDays: false,
      markWeekend: true,
      panelWidth: '350px',
    },
    data: [],
  };

  private _month = new Date().getUTCMonth();
  private _year: number = new Date().getFullYear();
  private _monthsBefore: number = 0;
  private _monthsAfter: number = 0;

  calendar: CalendarPanelSum | undefined;
  today = new Date();
  selectedDayStart: CalendarExtendedDay<any> | undefined;
  selectedDayBetween: CalendarExtendedDay<any>[] = [];
  selectedDayEnd: CalendarExtendedDay<any> | undefined;
  markWeekend = this._dataSource.config.markWeekend;
  bluredDays = this._dataSource.config.bluredDays;
  isLoading = true;
  monthOverrride = false;

  weekendColor = 'rgba(0, 0, 0, .25)';

  get dataSource(): CalendarPanels<any> {
    return this._dataSource;
  }
  get month(): number {
    return this._month;
  }
  get year(): number {
    return this._year;
  }
  get monthsBefore(): number {
    return this._monthsBefore;
  }
  get monthsAfter(): number {
    return this._monthsAfter;
  }

  @Input()
  set dataSource(data: CalendarPanels<any>) {
    this._dataSource = data;
    this.generateCal();
  }
  @Input()
  set month(data: number) {
    this._month = data;
    this.monthOverrride = false;
    this.generateCal();
  }
  @Input()
  set year(data: number) {
    this._year = data;
    this.generateCal();
  }
  @Input()
  set monthsBefore(data: number) {
    this._monthsBefore = data;
    this.generateCal();
  }
  @Input()
  set monthsAfter(data: number) {
    this._monthsAfter = data;
    this.generateCal();
  }
  @Input() placeholderDay: boolean = false;

  @Output() readonly selection = new EventEmitter<CalendarEvent<any>>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.selectedDayBetween = [];
      this.selectedDayStart = undefined;
      this.selectedDayEnd = undefined;
    }
  }

  constructor(private calendarService: FsCalendarService) {}

  ngOnInit() {
    this.isLoading = false;
  }

  onClick(day: CalendarExtendedDay<any>, type: string) {
    if (type === 'date' && this._dataSource.config.selectMode === 'range') {
      if (this.selectedDayStart != undefined && this.selectedDayEnd != undefined) {
        this.selectedDayBetween = [];
        this.selectedDayStart = undefined;
        this.selectedDayEnd = undefined;
      }
      if (dateFns.isBefore(day.date, this.selectedDayStart?.date as Date) || this.selectedDayStart === undefined) {
        this.selectedDayStart = day;
      } else {
        this.selectedDayEnd = day;

        let daysBetween: number = dateFns.differenceInDays(this.selectedDayStart.date, this.selectedDayEnd.date);
        let daysAffected: CalendarExtendedDay<any>[] = [];

        daysAffected.push(this.selectedDayStart);
        if (daysBetween < 0) {
          console.log(this.dataSource.data);
          for (let index = 1; index < daysBetween * -1 + 1; index++) {
            let newGeneratedDay = this.calendarService.generateDay(dateFns.addDays(this.selectedDayStart.date, index), []);
            let i = this.dataSource.data.findIndex(sd => dateFns.isSameDay(sd.date, newGeneratedDay.date));
            console.log('index:', i, newGeneratedDay.date);
            if (i != -1) {
              console.log('found one match');
              daysAffected.push(this.dataSource.data[i]);
            } else {
              daysAffected.push(newGeneratedDay);
            }
          }
        }

        this.selection.emit({
          type: 'range',
          start: this.selectedDayStart,
          end: this.selectedDayEnd,
          affectedDays: daysAffected,
        });
      }
    } else {
      this.selection.emit({
        type: 'click',
        date: day,
      });
    }
  }

  onMouseOver(dateComp: Date) {
    if (this.calendar != undefined) {
      if (this.selectedDayStart != undefined && this.selectedDayEnd == undefined) {
        this.selectedDayBetween = this.calendar.daysAbsolute.filter(date => {
          return dateFns.isAfter(date.date, this.selectedDayStart?.date as Date) && dateFns.isBefore(date.date, dateComp);
        });
      }
    }
  }

  getAmIBetween(date: Date): boolean {
    const fIndex = this.selectedDayBetween.findIndex(selDate => {
      return dateFns.isSameDay(selDate.date, date);
    });
    if (fIndex != -1) {
      return true;
    } else {
      return false;
    }
  }

  isSelectedDayStart(date: Date): boolean {
    if (this.selectedDayStart) {
      return dateFns.isSameDay(this.selectedDayStart.date, date);
    } else {
      return false;
    }
  }
  isSelectedDayEnd(date: Date): boolean {
    if (this.selectedDayEnd) {
      return dateFns.isSameDay(this.selectedDayEnd.date, date);
    } else {
      if (this.selectedDayBetween.length > 0) {
        if (dateFns.isSameDay(this.calendarService.addDays(this.selectedDayBetween[this.selectedDayBetween.length - 1], 1).date, date)) {
          return true;
        }
      }
      return false;
    }
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }

  getCanIBeHighlighted(date: Date) {
    if (this.selectedDayEnd) {
      if (
        (!dateFns.isSameDay(this.selectedDayStart?.date as Date, date) && !dateFns.isSameDay(this.selectedDayEnd?.date, date) && this.getAmIBetween(date)) ||
        (dateFns.isSameDay(this.selectedDayEnd?.date, date) && this.selectedDayEnd != undefined) ||
        (dateFns.isSameDay(this.selectedDayStart?.date as Date, date) && this.selectedDayStart != undefined)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onMonthForward() {
    this.monthOverrride = true;
    if (this.month >= 11 || this._month >= 11) {
      this._year = parseInt(this.year.toString(), 10) + 1;
      this._month = 0;
    } else {
      this._month = parseInt(this._month.toString(), 10) + 1;
    }
    this.generateCal();
  }

  onMonthBackward() {
    this.monthOverrride = true;
    if (this.month <= 0 || this._month <= 0) {
      this._year = parseInt(this.year.toString(), 10) - 1;
      this._month = 11;
    } else {
      this._month = parseInt(this._month.toString(), 10) - 1;
    }
    this.generateCal();
  }

  private generateCal() {
    const usedYear = this.monthOverrride ? this._year : this.year;
    const usedMonth = this.monthOverrride ? this._month : this.month;
    this.calendar = this.calendarService.generateMatrix(
      this._dataSource.config.renderMode,
      this._dataSource.config.calendarWeek,
      this.dataSource.data,
      usedYear,
      usedMonth,
      this.monthsBefore,
      this.monthsAfter
    );
  }
}
