# FsCalendar Documentation

The `FsCalendar` components provide flexible, modern calendar views for Angular Material applications. Available in two variants: panels-based and table-based layouts.

> **Angular 20+**: These components use standalone architecture, signals-based reactivity, and OnPush change detection for optimal performance.

---

## Features

- **Two layout variants**: Panels (card-based) and Table (grid-based)
- **Multi-select support**: Select multiple dates with visual feedback
- **Status indicators**: Visual day status with customizable colors
- **Signal-based state**: Efficient reactivity with Angular signals
- **Accessibility**: Full ARIA support with keyboard navigation
- **Material 3 theming**: Seamless integration with Angular Material themes
- **Responsive design**: Adapts to different screen sizes

---

## Installation

### Standalone Components (Angular 20+)

Import individual components directly:

```typescript
import {
  FsCalendarPanelsComponent,
  FsCalendarTableComponent,
  CalendarDay,
  DayStatus
} from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-root',
  imports: [
    FsCalendarPanelsComponent,
    // OR
    FsCalendarTableComponent,
  ]
})
export class AppComponent {}
```

---

## Main Components

- [`FsCalendarPanelsComponent`](../projects/ngx-mat-components/src/fs-calendar/calendar-panels/calendar-panels.component.ts) - Card-based calendar layout
- [`FsCalendarTableComponent`](../projects/ngx-mat-components/src/fs-calendar/calendar-table/fs-calendar-table.component.ts) - Table/grid-based calendar layout

---

## Basic Usage

### Panels Layout

```typescript
import { Component, signal } from '@angular/core';
import { 
  FsCalendarPanelsComponent, 
  CalendarDay 
} from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-calendar',
  imports: [FsCalendarPanelsComponent],
  template: `
    <fs-calendar-panels
      [year]="year()"
      [month]="month()"
      [selectedDates]="selectedDates()"
      [days]="days()"
      (dateSelected)="onDateSelected($event)"
      (monthChanged)="onMonthChanged($event)"
    />
  `
})
export class CalendarComponent {
  year = signal(2024);
  month = signal(3); // April (0-indexed)
  selectedDates = signal<Date[]>([]);
  days = signal<CalendarDay[]>([]);

  onDateSelected(date: Date) {
    this.selectedDates.update(dates => [...dates, date]);
  }

  onMonthChanged(change: { year: number; month: number }) {
    this.year.set(change.year);
    this.month.set(change.month);
  }
}
```

### Table Layout

```typescript
import { Component, signal } from '@angular/core';
import { 
  FsCalendarTableComponent, 
  CalendarDay,
  DayStatus 
} from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-calendar-table',
  imports: [FsCalendarTableComponent],
  template: `
    <fs-calendar-table
      [year]="year()"
      [month]="month()"
      [selectedDates]="selectedDates()"
      [days]="days()"
      (dateSelected)="onDateSelected($event)"
      (monthChanged)="onMonthChanged($event)"
    />
  `
})
export class CalendarTableComponent {
  year = signal(2024);
  month = signal(3);
  selectedDates = signal<Date[]>([]);
  
  // Example with day statuses
  days = signal<CalendarDay[]>([
    {
      date: new Date(2024, 3, 15),
      status: 'available',
      statusColor: '#4caf50'
    },
    {
      date: new Date(2024, 3, 20),
      status: 'booked',
      statusColor: '#f44336'
    }
  ]);

  onDateSelected(date: Date) {
    const dates = this.selectedDates();
    const index = dates.findIndex(d => 
      d.getTime() === date.getTime()
    );
    
    if (index >= 0) {
      // Deselect
      this.selectedDates.update(dates => 
        dates.filter((_, i) => i !== index)
      );
    } else {
      // Select
      this.selectedDates.update(dates => [...dates, date]);
    }
  }

  onMonthChanged(change: { year: number; month: number }) {
    this.year.set(change.year);
    this.month.set(change.month);
    // Load data for new month
    this.loadDaysForMonth(change.year, change.month);
  }

  private loadDaysForMonth(year: number, month: number) {
    // Fetch or compute days with statuses
  }
}
```

---

## API

### Inputs (Component Signals)

Both `FsCalendarPanelsComponent` and `FsCalendarTableComponent` accept:

```typescript
// Required inputs
year: InputSignal<number>           // Current year
month: InputSignal<number>          // Current month (0-11)
selectedDates: InputSignal<Date[]>  // Selected dates array
days: InputSignal<CalendarDay[]>    // Days with status info
```

### Outputs (Component Outputs)

```typescript
dateSelected: OutputEmitterRef<Date>                    // Emits when date clicked
monthChanged: OutputEmitterRef<{ year: number; month: number }>  // Emits on month navigation
```

### Types

#### CalendarDay

```typescript
export interface CalendarDay {
  date: Date;              // The date
  status?: DayStatus;      // Optional status
  statusColor?: string;    // Optional color (hex/rgb)
}
```

#### DayStatus

```typescript
export type DayStatus = 
  | 'available' 
  | 'booked' 
  | 'pending' 
  | 'blocked' 
  | string; // Custom status
```

---

## Advanced Usage

### Multi-Select Calendar with Status

```typescript
import { Component, signal, computed } from '@angular/core';
import { 
  FsCalendarPanelsComponent, 
  CalendarDay,
  DayStatus 
} from '@fullstack-devops/ngx-mat-components';

interface Booking {
  date: Date;
  status: DayStatus;
}

@Component({
  selector: 'app-booking-calendar',
  imports: [FsCalendarPanelsComponent],
  template: `
    <div class="booking-calendar">
      <div class="summary">
        <h3>Selected Dates: {{ selectedCount() }}</h3>
        <button (click)="clearSelection()">Clear All</button>
      </div>
      
      <fs-calendar-panels
        [year]="year()"
        [month]="month()"
        [selectedDates]="selectedDates()"
        [days]="calendarDays()"
        (dateSelected)="toggleDate($event)"
        (monthChanged)="onMonthChanged($event)"
      />
      
      <div class="legend">
        <span class="legend-item available">Available</span>
        <span class="legend-item booked">Booked</span>
        <span class="legend-item selected">Selected</span>
      </div>
    </div>
  `,
  styles: [`
    .booking-calendar {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .legend {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      
      &::before {
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 4px;
      }
      
      &.available::before { background: #4caf50; }
      &.booked::before { background: #f44336; }
      &.selected::before { background: #2196f3; }
    }
  `]
})
export class BookingCalendarComponent {
  year = signal(new Date().getFullYear());
  month = signal(new Date().getMonth());
  selectedDates = signal<Date[]>([]);
  
  // Example bookings data
  bookings = signal<Booking[]>([
    { date: new Date(2024, 3, 10), status: 'booked' },
    { date: new Date(2024, 3, 15), status: 'booked' },
    { date: new Date(2024, 3, 20), status: 'available' },
    { date: new Date(2024, 3, 25), status: 'available' },
  ]);
  
  // Computed calendar days
  calendarDays = computed<CalendarDay[]>(() => {
    return this.bookings().map(booking => ({
      date: booking.date,
      status: booking.status,
      statusColor: this.getStatusColor(booking.status)
    }));
  });
  
  selectedCount = computed(() => this.selectedDates().length);
  
  toggleDate(date: Date) {
    const dates = this.selectedDates();
    const index = dates.findIndex(d => 
      d.toDateString() === date.toDateString()
    );
    
    if (index >= 0) {
      this.selectedDates.update(dates => 
        dates.filter((_, i) => i !== index)
      );
    } else {
      // Check if date is available
      const booking = this.bookings().find(b => 
        b.date.toDateString() === date.toDateString()
      );
      
      if (booking?.status === 'available') {
        this.selectedDates.update(dates => [...dates, date]);
      }
    }
  }
  
  clearSelection() {
    this.selectedDates.set([]);
  }
  
  onMonthChanged(change: { year: number; month: number }) {
    this.year.set(change.year);
    this.month.set(change.month);
    // Load bookings for new month
  }
  
  private getStatusColor(status: DayStatus): string {
    switch (status) {
      case 'available': return '#4caf50';
      case 'booked': return '#f44336';
      case 'pending': return '#ff9800';
      case 'blocked': return '#9e9e9e';
      default: return '#2196f3';
    }
  }
}
```

### Integration with Backend API

```typescript
import { Component, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  FsCalendarTableComponent, 
  CalendarDay 
} from '@fullstack-devops/ngx-mat-components';

@Component({
  selector: 'app-api-calendar',
  imports: [FsCalendarTableComponent],
  template: `
    <fs-calendar-table
      [year]="year()"
      [month]="month()"
      [selectedDates]="selectedDates()"
      [days]="days()"
      (dateSelected)="onDateSelected($event)"
      (monthChanged)="onMonthChanged($event)"
    />
    
    @if (loading()) {
      <div class="loading-overlay">Loading...</div>
    }
  `
})
export class ApiCalendarComponent {
  private http = inject(HttpClient);
  
  year = signal(new Date().getFullYear());
  month = signal(new Date().getMonth());
  selectedDates = signal<Date[]>([]);
  days = signal<CalendarDay[]>([]);
  loading = signal(false);
  
  constructor() {
    // Load data when month/year changes
    effect(() => {
      const year = this.year();
      const month = this.month();
      this.loadAvailability(year, month);
    });
  }
  
  private async loadAvailability(year: number, month: number) {
    this.loading.set(true);
    
    try {
      const response = await firstValueFrom(
        this.http.get<{ availability: CalendarDay[] }>(
          `/api/calendar/${year}/${month}`
        )
      );
      
      this.days.set(response.availability);
    } catch (error) {
      console.error('Failed to load availability:', error);
    } finally {
      this.loading.set(false);
    }
  }
  
  async onDateSelected(date: Date) {
    // Optimistic update
    this.selectedDates.update(dates => [...dates, date]);
    
    try {
      await firstValueFrom(
        this.http.post('/api/bookings', { date })
      );
    } catch (error) {
      // Rollback on error
      this.selectedDates.update(dates => 
        dates.filter(d => d.getTime() !== date.getTime())
      );
      console.error('Booking failed:', error);
    }
  }
  
  onMonthChanged(change: { year: number; month: number }) {
    this.year.set(change.year);
    this.month.set(change.month);
  }
}
```

---

## Accessibility

Both calendar components include:

- **Keyboard navigation**: Arrow keys to navigate dates, Enter/Space to select
- **ARIA labels**: Screen reader support for dates, months, and status
- **Focus management**: Proper focus indicators and tab order
- **Status announcements**: Screen readers announce day status

Example accessible usage:

```html
<fs-calendar-panels
  [year]="year()"
  [month]="month()"
  [selectedDates]="selectedDates()"
  [days]="days()"
  aria-label="Event booking calendar"
  (dateSelected)="onDateSelected($event)"
  (monthChanged)="onMonthChanged($event)"
/>
```

---

## Theming & Styling

### Material 3 Theme Integration

```scss
@use '@fullstack-devops/ngx-mat-components' as fsc;
@use '@angular/material' as mat;

@include mat.app-background();
@include fsc.core();
```

### Custom Status Colors

```typescript
// Define custom status colors
const statusColors: Record<DayStatus, string> = {
  available: '#4caf50',
  booked: '#f44336',
  pending: '#ff9800',
  blocked: '#757575',
  confirmed: '#2196f3'
};

days.set(
  availabilityData.map(item => ({
    date: item.date,
    status: item.status,
    statusColor: statusColors[item.status]
  }))
);
```

---

## Panels vs Table: When to Use

### Use Panels Layout When:
- Card-based UI fits your design
- You want larger, more prominent day cells
- Displaying rich content per day (multiple events, images)
- Mobile-first responsive design

### Use Table Layout When:
- Traditional calendar grid view is preferred
- Compact display is needed
- Printing calendar views
- Dense data display (month overview)

---

## API Reference

### Components
- [`FsCalendarPanelsComponent`](../projects/ngx-mat-components/src/fs-calendar/calendar-panels/calendar-panels.component.ts)
- [`FsCalendarTableComponent`](../projects/ngx-mat-components/src/fs-calendar/calendar-table/fs-calendar-table.component.ts)

### Types
- [`CalendarDay`](../projects/ngx-mat-components/src/fs-calendar/calendar.models.ts)
- [`DayStatus`](../projects/ngx-mat-components/src/fs-calendar/calendar.models.ts)

---

## See Also

- [Live Demo](https://fullstack-devops.github.io/ngx-mat-components)
- Workspace Examples:
  - [Panels Example](https://github.com/fullstack-devops/ngx-mat-components/blob/main/projects/lib-workspace/src/app/showcase-calendar-panels/showcase-calendar-panels.component.ts)
  - [Table Example](https://github.com/fullstack-devops/ngx-mat-components/blob/main/projects/lib-workspace/src/app/showcase-calendar-table/showcase-calendar-table.component.ts)
- [CHANGELOG.md](../CHANGELOG.md) - Migration guide from NgModules
