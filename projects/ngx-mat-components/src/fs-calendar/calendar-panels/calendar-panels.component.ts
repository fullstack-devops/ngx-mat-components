import { ChangeDetectionStrategy, Component, computed, effect, HostListener, inject, input, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as dateFns from 'date-fns';
import { CalendarEvent, CalendarExtendedDay, CalendarPanels, CalendarPanelSum } from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

@Component({
  selector: 'fs-calendar-panels',
  templateUrl: './calendar-panels.component.html',
  styleUrls: ['./calendar-panels.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-calendar-panels',
    'data-component-id': 'fs-calendar-panels-unique',
  },
})
export class FsCalendarPanelsComponent implements OnInit {
  private readonly calendarService = inject(FsCalendarService);

  dataSource = input<CalendarPanels<any>>({
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
  });

  month = input<number>(new Date().getUTCMonth());
  year = input<number>(new Date().getFullYear());
  monthsBefore = input<number>(0);
  monthsAfter = input<number>(0);
  placeholderDay = input<boolean>(false);

  selection = output<CalendarEvent<any>>();

  private readonly internalMonth = signal<number>(new Date().getUTCMonth());
  private readonly internalYear = signal<number>(new Date().getFullYear());

  protected readonly calendar = computed<CalendarPanelSum | undefined>(() => {
    const ds = this.dataSource();
    const usedYear = this.monthOverrride() ? this.internalYear() : this.year();
    const usedMonth = this.monthOverrride() ? this.internalMonth() : this.month();

    return this.calendarService.generateMatrix(
      ds.config.renderMode,
      ds.config.calendarWeek,
      ds.data,
      usedYear,
      usedMonth,
      this.monthsBefore(),
      this.monthsAfter()
    );
  });

  protected readonly today = new Date();
  protected readonly selectedDayStart = signal<CalendarExtendedDay<any> | undefined>(undefined);
  protected readonly selectedDayBetween = signal<CalendarExtendedDay<any>[]>([]);
  protected readonly selectedDayEnd = signal<CalendarExtendedDay<any> | undefined>(undefined);
  protected readonly monthOverrride = signal<boolean>(false);
  protected readonly isLoading = signal<boolean>(true);

  protected readonly markWeekend = computed(() => this.dataSource().config.markWeekend);
  protected readonly bluredDays = computed(() => this.dataSource().config.bluredDays);
  protected readonly weekendColor = 'rgba(0, 0, 0, .25)';

  constructor() {
    // Sync input signals to internal signals on changes
    effect(() => {
      this.internalMonth.set(this.month());
      this.internalYear.set(this.year());
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.selectedDayBetween.set([]);
      this.selectedDayStart.set(undefined);
      this.selectedDayEnd.set(undefined);
    }
  }

  ngOnInit() {
    this.isLoading.set(false);
  }

  onClick(day: CalendarExtendedDay<any>, type: string) {
    const config = this.dataSource().config;

    if (type === 'date' && config.selectMode === 'range') {
      const start = this.selectedDayStart();
      const end = this.selectedDayEnd();

      if (start != undefined && end != undefined) {
        this.selectedDayBetween.set([]);
        this.selectedDayStart.set(undefined);
        this.selectedDayEnd.set(undefined);
      }

      if (dateFns.isBefore(day.date, start?.date as Date) || start === undefined) {
        this.selectedDayStart.set(day);
      } else {
        this.selectedDayEnd.set(day);

        let daysBetween: number = dateFns.differenceInDays(start.date, day.date);
        let daysAffected: CalendarExtendedDay<any>[] = [];

        daysAffected.push(start);
        if (daysBetween < 0) {
          for (let index = 1; index < daysBetween * -1 + 1; index++) {
            let newGeneratedDay = this.calendarService.generateDay(dateFns.addDays(start.date, index), []);
            let i = this.dataSource().data.findIndex(sd => dateFns.isSameDay(sd.date, newGeneratedDay.date));
            if (i != -1) {
              daysAffected.push(this.dataSource().data[i]);
            } else {
              daysAffected.push(newGeneratedDay);
            }
          }
        }

        this.selection.emit({
          type: 'range',
          start: start,
          end: day,
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
    const cal = this.calendar();
    const start = this.selectedDayStart();
    const end = this.selectedDayEnd();

    if (cal != undefined) {
      if (start != undefined && end == undefined) {
        this.selectedDayBetween.set(
          cal.daysAbsolute.filter(date => {
            return dateFns.isAfter(date.date, start.date) && dateFns.isBefore(date.date, dateComp);
          })
        );
      }
    }
  }

  getAmIBetween(date: Date): boolean {
    const between = this.selectedDayBetween();
    const fIndex = between.findIndex(selDate => {
      return dateFns.isSameDay(selDate.date, date);
    });
    return fIndex != -1;
  }

  isSelectedDayStart(date: Date): boolean {
    const start = this.selectedDayStart();
    if (start) {
      return dateFns.isSameDay(start.date, date);
    }
    return false;
  }

  isSelectedDayEnd(date: Date): boolean {
    const end = this.selectedDayEnd();
    const between = this.selectedDayBetween();

    if (end) {
      return dateFns.isSameDay(end.date, date);
    } else {
      if (between.length > 0) {
        if (dateFns.isSameDay(this.calendarService.addDays(between[between.length - 1], 1).date, date)) {
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
    const start = this.selectedDayStart();
    const end = this.selectedDayEnd();

    if (end) {
      if (
        (!dateFns.isSameDay(start?.date as Date, date) && !dateFns.isSameDay(end.date, date) && this.getAmIBetween(date)) ||
        (dateFns.isSameDay(end.date, date) && end != undefined) ||
        (dateFns.isSameDay(start?.date as Date, date) && start != undefined)
      ) {
        return true;
      }
      return false;
    }
    return false;
  }

  onMonthForward() {
    this.monthOverrride.set(true);
    const currentMonth = this.internalMonth();
    const currentYear = this.internalYear();

    if (currentMonth >= 11) {
      this.internalYear.set(currentYear + 1);
      this.internalMonth.set(0);
    } else {
      this.internalMonth.set(currentMonth + 1);
    }
  }

  onMonthBackward() {
    this.monthOverrride.set(true);
    const currentMonth = this.internalMonth();
    const currentYear = this.internalYear();

    if (currentMonth <= 0) {
      this.internalYear.set(currentYear - 1);
      this.internalMonth.set(11);
    } else {
      this.internalMonth.set(currentMonth - 1);
    }
  }
}
