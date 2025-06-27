import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class FsThemeMenu {
  private _theme: FsThemeColorSchemes = FsThemeColorSchemes.Auto;
  readonly FsThemeColorSchemes = FsThemeColorSchemes;

  @Input()
  set theme(value: FsThemeColorSchemes) {
    this._theme = value;
    const body = document.body;
    body.classList.remove(FsThemeColorSchemes.Light, FsThemeColorSchemes.Dark);
    if (value && value !== FsThemeColorSchemes.Auto) {
      body.classList.add(value);
    }
    this.themeChange.emit(value);
  }
  get theme(): FsThemeColorSchemes {
    return this._theme;
  }
  @Output() themeChange = new EventEmitter<FsThemeColorSchemes>();

  isSelected(requested: FsThemeColorSchemes): boolean {
    return this.theme === requested;
  }

  onColorSchemeChange(value: FsThemeColorSchemes): void {
    this.theme = value;
  }
}
