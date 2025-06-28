import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { FsCheckSvg } from './fs-check-svg';
import { FsThemeIcon } from './fs-theme-icon/fs-theme-icon';
import { MatButtonModule } from '@angular/material/button';

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
})
export class FsThemeMenu implements OnInit {
  private _theme: FsThemeColorSchemes = FsThemeColorSchemes.Auto;
  readonly FsThemeColorSchemes = FsThemeColorSchemes;

  @Input() localStorageKey = 'fs-selected-theme';
  @Input()
  set theme(value: FsThemeColorSchemes) {
    this._theme = value;
    const body = document.body;
    body.classList.remove(FsThemeColorSchemes.Light, FsThemeColorSchemes.Dark);

    // Persist only if not auto
    if (value && value !== FsThemeColorSchemes.Auto) {
      body.classList.add(value);
      localStorage.setItem(this.localStorageKey, value);
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
    this.themeChange.emit(value);
  }
  get theme(): FsThemeColorSchemes {
    return this._theme;
  }
  @Output() themeChange = new EventEmitter<FsThemeColorSchemes>();

  ngOnInit() {
    this.loadThemeFromStorage();
  }

  isSelected(requested: FsThemeColorSchemes): boolean {
    return this.theme === requested;
  }

  onColorSchemeChange(value: FsThemeColorSchemes): void {
    this.theme = value;
  }

  // Call this in ngOnInit or constructor
  loadThemeFromStorage() {
    const stored = localStorage.getItem(this.localStorageKey) as FsThemeColorSchemes;
    if (stored === FsThemeColorSchemes.Light || stored === FsThemeColorSchemes.Dark) {
      this.theme = stored;
    } else {
      this.theme = FsThemeColorSchemes.Auto;
    }
  }
}
