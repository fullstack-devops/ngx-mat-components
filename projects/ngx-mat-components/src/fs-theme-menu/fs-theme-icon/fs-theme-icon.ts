import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FsThemeColorSchemes } from '../fs-theme-menu';

@Component({
  selector: 'fs-theme-icon',
  templateUrl: './fs-theme-icon.html',
  styleUrls: ['./fs-theme-icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsThemeIcon {
  theme = input<FsThemeColorSchemes>(FsThemeColorSchemes.Auto);
  readonly FsThemeColorSchemes = FsThemeColorSchemes;
}
