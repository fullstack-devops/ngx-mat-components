import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { ShowcaseCalendarPanelsComponent } from './content/showcase-calendar-panels/showcase-calendar-panels.component';
import { ShowcaseCalendarTableComponent } from './content/showcase-calendar-table/showcase-calendar-table.component';
import { ShowcaseNavFrameComponent } from './content/showcase-nav-frame/showcase-nav-frame.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'nav-frame',
    component: ShowcaseNavFrameComponent,
  },
  {
    path: 'calendar-panels',
    component: ShowcaseCalendarPanelsComponent,
  },
  {
    path: 'calendar-table',
    component: ShowcaseCalendarTableComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
