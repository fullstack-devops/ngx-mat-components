import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as dateFnsLocales from 'date-fns/locale';
import { FsCalendarModule, FsCalendarService, FsNavFrameModule } from 'projects/ngx-mat-components/src/public-api';
import { HomeComponent } from './content/home/home.component';
import { ShowcaseCalendarPanelsComponent } from './content/showcase-calendar-panels/showcase-calendar-panels.component';
import { ShowcaseCalendarTableComponent } from './content/showcase-calendar-table/showcase-calendar-table.component';
import { ShowcaseNavFrameComponent } from './content/showcase-nav-frame/showcase-nav-frame.component';

const locales: any = dateFnsLocales;

@NgModule({
  declarations: [AppComponent, HomeComponent, ShowcaseCalendarPanelsComponent, ShowcaseCalendarTableComponent, ShowcaseNavFrameComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '.',
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: 'FS_DATE_LOCALE',
      useClass: FsCalendarService,
      useValue: locales[navigator.language],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
