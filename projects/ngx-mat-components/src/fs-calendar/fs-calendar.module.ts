/**
 * FsCalendarModule - Barrel Module for Calendar Components
 *
 * Import this single module to get all Calendar components and directives.
 * Follows Angular Material's module pattern for better DX.
 *
 * @example
 * ```typescript
 * import { FsCalendarModule } from '@fullstack-devops/ngx-mat-components';
 *
 * @Component({
 *   imports: [FsCalendarModule]
 * })
 * export class AppComponent {}
 * ```
 */

import { FsCalendarPanelsComponent } from './calendar-panels/calendar-panels.component';
import { FsCalendarTableComponent } from './calendar-table/fs-calendar-table.component';
import { FsCalendarTableNameDirective } from './directives/fs-calendar-table-name.directive';

/**
 * All Calendar related components and directives
 */
export const FS_CALENDAR_COMPONENTS = [
  FsCalendarPanelsComponent,
  FsCalendarTableComponent,
  FsCalendarTableNameDirective,
] as const;

/**
 * Convenience array for importing all Calendar components
 *
 * Use this in your component's imports array:
 *
 * @example
 * ```typescript
 * @Component({
 *   imports: [FsCalendarModule]
 * })
 * export class AppComponent {}
 * ```
 */
export const FsCalendarModule = FS_CALENDAR_COMPONENTS;
