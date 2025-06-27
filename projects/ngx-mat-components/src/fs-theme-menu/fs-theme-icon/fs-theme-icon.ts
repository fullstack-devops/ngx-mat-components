import { Component, Input } from '@angular/core';
import { FsThemeColorSchemes } from '../fs-theme-menu';

@Component({
  selector: 'fs-theme-icon',
  templateUrl: './fs-theme-icon.html',
  styleUrls: ['./fs-theme-icon.scss'],
})
export class FsThemeIcon {
  @Input() theme: FsThemeColorSchemes = FsThemeColorSchemes.Auto;
  readonly FsThemeColorSchemes = FsThemeColorSchemes;
}
