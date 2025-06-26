import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_CARD_CONFIG } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_BUTTON_CONFIG } from '@angular/material/button';
import * as dateFnsLocales from 'date-fns/locale';
import { FsCalendarService } from 'ngx-mat-components';
import { APP_BASE_HREF } from '@angular/common';

const locales: any = dateFnsLocales;

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '.',
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: MAT_BUTTON_CONFIG, useValue: { defaultAppearance: 'outlined' } },
    { provide: MAT_CARD_CONFIG, useValue: { appearance: 'outlined' } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 5000, verticalPosition: 'top', horizontalPosition: 'end' },
    },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: 'FS_DATE_LOCALE',
      useClass: FsCalendarService,
      useValue: locales[navigator.language],
    },
  ],
};
