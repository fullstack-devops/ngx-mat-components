/*
 * Public API Surface of ngx-mat-components
 */

export { FsCalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
export { FsCalendarTableComponent } from './calendar-table/fs-calendar-table.component';
export * from './calendar.models';
export { FsCalendarTableNameDirective } from './directives/fs-calendar-table-name.directive';
// Removed: export { FsCalendarModule } - Using standalone components now
export { FsCalendarService } from './services/fs-calendar.service';

// Barrel Module - Import ALL components at once (like Angular Material)
export { FsCalendarModule, FS_CALENDAR_COMPONENTS } from './fs-calendar.module';
