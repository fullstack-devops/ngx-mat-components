/**
 * FsNavFrameModule - Barrel Module for Nav Frame Components
 *
 * Import this single module to get all Nav Frame components and directives.
 * Follows Angular Material's module pattern for better DX.
 *
 * @example
 * ```typescript
 * import { FsNavFrameModule } from '@fullstack-devops/ngx-mat-components';
 *
 * @Component({
 *   imports: [FsNavFrameModule]
 * })
 * export class AppComponent {}
 * ```
 */

import { FsNavFrameComponent } from './fs-nav-frame.component';
import { FsNavFrameSidebar } from './components/fs-nav-frame-sidebar';
import { FsNavFrameSidebarItemComponent } from './components/fs-nav-frame-sidebar-item/fs-nav-frame-sidebar-item.component';
import { FsNavUserProfileComponent } from './fs-nav-user-profile/fs-nav-user-profile.component';
import { FsNavUserProfileActionsDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-actions.directive';
import { FsNavUserProfileNameDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-name.directive';
import { FsNavUserProfileSubNameDirective } from './fs-nav-user-profile/directives/fs-nav-user-profile-subname.directive';
import { FsNavFrameToolbarComponent } from './nav-frame-toolbar/fs-nav-frame-toolbar.component';
import { FsNavFrameToolbarStartDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-start.directive';
import { FsNavFrameToolbarCenterDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-center.directive';
import { FsNavFrameToolbarEndDirective } from './nav-frame-toolbar/directives/fs-nav-frame-toolbar-end.directive';
import { FsNavFrameContentDirective } from './directives/fs-nav-frame-content.directive';

/**
 * All Nav Frame related components and directives
 */
export const FS_NAV_FRAME_COMPONENTS = [
  FsNavFrameComponent,
  FsNavFrameSidebar,
  FsNavFrameSidebarItemComponent,
  FsNavUserProfileComponent,
  FsNavUserProfileActionsDirective,
  FsNavUserProfileNameDirective,
  FsNavUserProfileSubNameDirective,
  FsNavFrameToolbarComponent,
  FsNavFrameToolbarStartDirective,
  FsNavFrameToolbarCenterDirective,
  FsNavFrameToolbarEndDirective,
  FsNavFrameContentDirective,
] as const;

/**
 * Convenience array for importing all Nav Frame components
 *
 * Use this in your component's imports array:
 *
 * @example
 * ```typescript
 * @Component({
 *   imports: [FsNavFrameModule]
 * })
 * export class AppComponent {}
 * ```
 */
export const FsNavFrameModule = FS_NAV_FRAME_COMPONENTS;
