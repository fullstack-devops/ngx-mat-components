import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { FsCheckSvg } from './fs-check-svg';
import { FsThemeIcon } from './fs-theme-icon/fs-theme-icon';
import { MatButtonModule } from '@angular/material/button';
import { DOCUMENT } from '@angular/common';

export enum FsThemeColorSchemes {
  Auto = 'auto',
  Light = 'light-mode',
  Dark = 'dark-mode',
}

@Component({
  selector: 'fs-theme-menu',
  imports: [MatMenuModule, MatButtonModule, FsCheckSvg, FsThemeIcon],
  templateUrl: './fs-theme-menu.html',
  styleUrls: ['./fs-theme-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsThemeMenu implements OnInit {
  private readonly document = inject(DOCUMENT);
  readonly FsThemeColorSchemes = FsThemeColorSchemes;

  localStorageKey = input<string>('fs-selected-theme');
  theme = input<FsThemeColorSchemes>(FsThemeColorSchemes.Auto);
  themeChange = output<FsThemeColorSchemes>();

  private readonly currentTheme = signal<FsThemeColorSchemes>(FsThemeColorSchemes.Auto);

  constructor() {
    // Apply theme changes to DOM and localStorage
    effect(() => {
      const themeValue = this.currentTheme();
      const body = this.document.body;

      body.classList.remove(FsThemeColorSchemes.Light, FsThemeColorSchemes.Dark);

      // Persist only if not auto
      if (themeValue && themeValue !== FsThemeColorSchemes.Auto) {
        body.classList.add(themeValue);
        localStorage.setItem(this.localStorageKey(), themeValue);
      } else {
        localStorage.removeItem(this.localStorageKey());
      }

      this.themeChange.emit(themeValue);
    });
  }

  ngOnInit() {
    this.loadThemeFromStorage();
  }

  isSelected(requested: FsThemeColorSchemes): boolean {
    return this.currentTheme() === requested;
  }

  onColorSchemeChange(value: FsThemeColorSchemes): void {
    this.currentTheme.set(value);
  }

  loadThemeFromStorage() {
    const stored = localStorage.getItem(this.localStorageKey()) as FsThemeColorSchemes;
    if (stored === FsThemeColorSchemes.Light || stored === FsThemeColorSchemes.Dark) {
      this.currentTheme.set(stored);
    } else {
      this.currentTheme.set(FsThemeColorSchemes.Auto);
    }
  }
}
