import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Component, OnInit } from '@angular/core';
import { NavFrameConfig, NavFrameSizing, NavRoutes } from 'projects/ngx-mat-components/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FS DevOps`s ng mat components';

  navFrameConfig: NavFrameConfig = {
    appName: 'Demo App',
    appVersion: '0.0.0',
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
      icon: 'home',
      path: 'home',
      description: 'Home - Overview',
    },
    {
      title: 'Nav Frame',
      icon: 'pivot_table_chart',
      path: 'nav-frame',
      description: 'Nav Frame - Showcase',
    },
    {
      title: 'Calendar Panels',
      icon: 'calendar_month',
      path: 'calendar-panels',
      description: 'Calendar Panels - Showcase',
    },
    {
      title: 'Calendar Table',
      icon: 'event_note',
      path: 'calendar-table',
      description: 'Calendar Table - Showcase',
    },
    {
      title: 'Context is very looooooong',
      icon: 'article',
      path: 'not-set',
      description: 'Very loooong context',
    },
    {
      title: 'With children',
      icon: 'family_restroom',
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
      icon: 'badge',
      path: 'not-set',
      badgeNumber: 4,
      description: 'There is a badge',
    },
  ];

  constructor() {}

  ngOnInit() {
    registerLocaleData(localeDe, 'de-DE', localeDeExtra);
  }
}
