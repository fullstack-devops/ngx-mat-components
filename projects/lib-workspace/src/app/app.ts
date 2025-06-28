import { version } from 'packageJson';
import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import {
  BadgeIcon,
  BellIcon,
  BlocksIcon,
  CalendarIcon,
  CalendarRangeIcon,
  CircleQuestionMarkIcon,
  HouseIcon,
  LogOutIcon,
  LucideAngularModule,
  NavigationIcon,
  NewspaperIcon,
  UserPenIcon,
  CogIcon,
  PaintBucketIcon,
} from 'lucide-angular';
import { FsNavFrameModule, FsCalendarModule, NavFrameConfig, NavFrameSizing, NavRoutes, FsThemeMenu } from 'projects/ngx-mat-components/src/public-api';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ReactiveFormsModule,
    LucideAngularModule,
    /* Mat Modules */
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule,
    /* Lib modules */
    FsNavFrameModule,
    FsCalendarModule,
    FsThemeMenu,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'FS DevOps`s ng mat components';
  readonly CircleQuestionMarkIcon = CircleQuestionMarkIcon;
  readonly NewspaperIcon = NewspaperIcon;
  readonly BellIcon = BellIcon;
  readonly UserPenIcon = UserPenIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly CogIcon = CogIcon;
  readonly PaintBucketIcon = PaintBucketIcon;

  @HostBinding('attr.app-version') appVersion = version;

  navFrameConfig: NavFrameConfig = {
    appName: 'Demo App',
    appVersion: version,
    // logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1024px-Angular_full_color_logo.svg.png',
  };
  sizing: NavFrameSizing = {
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  };

  navRoutes: NavRoutes = [
    {
      title: 'Home',
      icon: HouseIcon,
      path: 'home',
      description: 'Home - Overview',
    },
    {
      title: 'Nav Frame',
      icon: NavigationIcon,
      path: 'nav-frame',
      description: 'Nav Frame - Showcase',
    },
    {
      title: 'Calendar Panels',
      icon: CalendarIcon,
      path: 'calendar-panels',
      description: 'Calendar Panels - Showcase',
    },
    {
      title: 'Calendar Table',
      icon: CalendarRangeIcon,
      path: 'calendar-table',
      description: 'Calendar Table - Showcase',
    },
    {
      title: 'Context is very looooooong',
      icon: NewspaperIcon,
      path: 'not-set',
      description: 'Very loooong context',
    },
    {
      title: 'With children',
      icon: BlocksIcon,
      path: 'not-set',
      description: 'Something with children!',
      childrens: [
        {
          title: 'Test',
          path: 'test',
        },
        {
          title: 'Test2',
          path: 'test2',
        },
      ],
    },
    {
      title: 'Badge -> nice',
      icon: BadgeIcon,
      path: 'not-set',
      badgeNumber: 4,
      description: 'There is a badge',
    },
  ];
}
