import { FsThemeMenu } from './fs-theme-menu';
import { FsThemeIcon } from './fs-theme-icon/fs-theme-icon';
import { FsCheckSvg } from './fs-check-svg';

/**
 * Array of all FsThemeMenu components and directives.
 *
 * Use this if you need to import components individually or create
 * a custom subset of components.
 */
export const FS_THEME_MENU_COMPONENTS = [
  FsThemeMenu,
  FsThemeIcon,
  FsCheckSvg,
] as const;

/**
 * Barrel module for FsThemeMenu - Import all theme menu components at once.
 *
 * This follows the Angular Material pattern where a single import gives you
 * all related components for a feature.
 *
 * @example
 * ```typescript
 * import { FsThemeMenuModule } from '@fsdevops/ngx-mat-components/fs-theme-menu';
 *
 * @Component({
 *   imports: [FsThemeMenuModule],
 *   template: `
 *     <fs-theme-menu
 *       [theme]="currentTheme()"
 *       (themeChange)="onThemeChange($event)">
 *     </fs-theme-menu>
 *   `
 * })
 * export class MyComponent {
 *   currentTheme = signal(FsThemeColorSchemes.Auto);
 *   onThemeChange(theme: FsThemeColorSchemes) {
 *     this.currentTheme.set(theme);
 *   }
 * }
 * ```
 *
 * @remarks
 * Instead of importing:
 * - FsThemeMenu
 * - FsThemeIcon
 * - FsCheckSvg
 *
 * You can now import just `FsThemeMenuModule` to get all components.
 *
 * @public
 */
export const FsThemeMenuModule = FS_THEME_MENU_COMPONENTS;
