/**
 *  @interface NavFrameConfig
 *
 *  @appName             {string}     displayed app name, shows only in opened mode
 *  @appVersion          {string}     (optional) display app version
 *  @logoSrc             {string}     (optional) link to logo, can be relative or full URL
 */
export interface NavFrameConfig {
  appName?: string;
  appVersion?: string;
  logoSrc?: string;
  sizing?: NavFrameSizing;
}

export interface NavFrameSizing {
  toolbarHeight?: number; // in rem
  sidebarWidthClosed?: number; // in rem
  sidebarWidthOpened?: number; // in rem
}

export interface NavItem {
  title: string;
  path: string;
}

/**
 *  @interface NavRoute
 *
 */
export interface Navigation {
  icon: string;
  title: string;
  path: string;
  description: string;
  badgeNumber?: number;
  childrens?: NavItem[];
  open?: boolean;
  [key: string]: any;
}

/**
 *  @type NavRoutes
 *
 */
export type NavRoutes = Navigation[];
