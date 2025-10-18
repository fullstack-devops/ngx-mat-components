import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import * as dateFns from 'date-fns';
import { CalendarMonth, CalendarTableEntry } from '../calendar.models';
import { FsCalendarService } from '../services/fs-calendar.service';

@Component({
  selector: 'fs-calendar-table',
  imports: [MatButtonModule],
  templateUrl: './fs-calendar-table.component.html',
  styleUrls: ['./fs-calendar-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-calendar-table mat-mdc-card mdc-card mat-mdc-card-outlined mdc-card--outlined',
    'data-component-id': 'fs-calendar-table-unique',
  },
})
export class FsCalendarTableComponent implements OnInit {
  private readonly calendarService = inject(FsCalendarService);

  dataSource = input<CalendarTableEntry[]>([]);
  month = input<number>(dateFns.getMonth(new Date()));
  year = input<number>(dateFns.getYear(new Date()));

  monthChange = output<number>();
  yearChange = output<number>();

  private readonly internalMonth = signal<number>(dateFns.getMonth(new Date()));
  private readonly internalYear = signal<number>(dateFns.getYear(new Date()));

  isLoading = signal<boolean>(true);
  markWeekend = true;

  protected readonly currentMonth = computed<CalendarMonth>(() => {
    return this.calendarService.generateMonth(this.internalYear(), this.internalMonth(), []);
  });

  protected readonly tableData = computed<CalendarTableEntry[]>(() => {
    const data = this.dataSource();
    return data.map((item: CalendarTableEntry) => ({
      name: item.name,
      data: this.calendarService.generateMonth(this.internalYear(), this.internalMonth(), item.data).days,
    }));
  });

  constructor() {
    // Sync input signals to internal signals
    effect(() => {
      this.internalMonth.set(this.month());
      this.monthChange.emit(this.month());
    });

    effect(() => {
      this.internalYear.set(this.year());
      this.yearChange.emit(this.year());
    });
  }

  ngOnInit() {
    this.isLoading.set(false);
  }

  onMonthForward() {
    const currentMonth = this.internalMonth();
    const currentYear = this.internalYear();

    if (currentMonth >= 11) {
      this.internalYear.set(currentYear + 1);
      this.internalMonth.set(0);
    } else {
      this.internalMonth.set(currentMonth + 1);
    }

    this.monthChange.emit(this.internalMonth());
    this.yearChange.emit(this.internalYear());
  }

  onMonthBackward() {
    const currentMonth = this.internalMonth();
    const currentYear = this.internalYear();

    if (currentMonth <= 0) {
      this.internalYear.set(currentYear - 1);
      this.internalMonth.set(11);
    } else {
      this.internalMonth.set(currentMonth - 1);
    }

    this.monthChange.emit(this.internalMonth());
    this.yearChange.emit(this.internalYear());
  }

  isToday(date: Date): boolean {
    return dateFns.isSameDay(new Date(), date);
  }
}
