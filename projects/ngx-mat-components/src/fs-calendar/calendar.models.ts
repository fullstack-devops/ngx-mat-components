export interface CalendarPanelSum {
  year: number;
  dayNames: String[];
  daysAbsolute: CalendarExtendedDay[];
  calendarPanels: CalendarPanel[];
}

export interface CalendarPanel {
  year: number;
  month: number;
  monthName: string;
  days: CalendarExtendedDay[];
  render: [CalendarExtendedDay[]];
}

export interface CalendarMonth {
  name: string;
  year: number;
  days: CalendarExtendedDay[];
  dayNames: String[];
}

/**
 * selectedRange for Calendar Panels
 * @param {string}    type                    type of event, in this case 'range'
 * @param {string}    start                   first day of selected range
 * @param {string}    end                     last day of selected range
 */
export interface CalendarSelectedRange<T = void> {
  type: 'range';
  start: CalendarExtendedDay<T>;
  end: CalendarExtendedDay<T>;
  affectedDays: CalendarExtendedDay<T>[];
}

/**
 * selectedDate for Calendar Panels
 * @param {string}    type                    type of event, in this case 'click'
 * @param {string}    date                    selected date
 */
export interface CalendarSelectedDate<T = void> {
  type: 'click';
  date: CalendarExtendedDay<T>;
}
export type CalendarEvent<T = void> = CalendarSelectedRange<T> | CalendarSelectedDate<T>;

export interface DayX {
  dayNumber: string;
  date: Date;
  kw?: number;
  isWeekendDay?: boolean;
  type?: string;
  color?: string;
  backgroundColor?: string;
  badge?: boolean;
  badgeMode?: string;
  badgeInt?: number;
  badgeIcon?: string;
  toolTip?: string;
}

/**
 * dataSource for Calendar Panels
 * @param {string}    config                  configurate your calendar panels
 * @param {string}    data                    set custom days CalendarExtendedDay[]
 */
export interface CalendarPanels<T = void> {
  config: CalendarPanelsConfig;
  data: CalendarExtendedDay<T>[];
}

/**
 * @param {string}    renderMode              @default monthly choose render mode ('annual' or 'monthly')
 * @param {string}    selectMode              @default click choose select mode ('click' or 'range')
 * @param {boolean}   calendarWeek            @default false display the calendar week
 * @param {boolean}   displayYear             @default true displays the year next to the Month name
 * @param {boolean}   switches                @default true show arrows to navigate an month forward or backwards
 * @param {boolean}   bluredDays              @default false make an circle around the number of the day
 * @param {boolean}   markWeekend             @default true highlight weekends
 * @param {boolean}   firstDayOfWeekMonday    @default true set first day of week (monday or sunday)
 * @param {string}    panelWidth              @default 350px set a with for an single panel
 */
export interface CalendarPanelsConfig {
  renderMode: 'monthly' | 'annual';
  selectMode: 'click' | 'range';
  calendarWeek: boolean;
  displayYear?: boolean;
  switches?: boolean;
  bluredDays?: boolean;
  markWeekend?: boolean;
  firstDayOfWeekMonday?: boolean;
  panelWidth?: string;
}

/**
 * dataSource for Calendar Table
 * @param {string}    nameCol                 configurate first coloum name
 * @param {string}    data                    set custom days CalendarExtendedDay[]
 */
export interface CalendarTable {
  nameCol: string;
  entries: CalendarTableEntry[];
}
/**
 * dataSource for Calendar Table
 * @param {string}    name                    configurate first coloum name
 * @param {CalendarExtendedDay[]}    data     set custom days CalendarExtendedDay[]
 */
export interface CalendarTableEntry {
  name: string;
  data: CalendarExtendedDay[];
}

/**
 * Use this to customize your data in the calendar
 * For Calendar Table and Panels
 * @param {Date}     date                     Date to match
 * @param {number}   char                     single charater will be displayed in day
 * @param {string}   colors.backgroundColor   set a custom css backgroundColor for your date
 * @param {string}   colors.color             set a custom css color for your date
 * @param {boolean}  isWeekendDay             Boolean if day weekend (override not allowed)
 * @param {string}   toolTip                  if set, this displays a mat-tooltip
 * @param {boolean}  badge.badgeMode          if you want to use a Badge, options: 'int' or 'icon'
 * @param {number}   badge.badgeInt           if badgeMode == 'int', set our Number here
 * @param {string}   badge.badgeIcon          if badgeMode == 'icon', set Icon (Material-Icons)
 * @param {Object}   _meta                    can be ignored
 */
export interface CalendarExtendedDay<T = void> {
  date: Date;
  char?: string;
  colors?: {
    backgroundColor: string;
    color?: string;
  };
  toolTip?: string;
  badge?: {
    badgeMode: 'int' | 'icon';
    badgeInt?: number;
    badgeIcon?: string;
  };
  _meta?: CalendarExtendedDayMeta;
  customData?: T;
}

export type CalendarExtendedDayMetaType = 'cw' | 'plHolder' | 'day';
export interface CalendarExtendedDayMeta {
  kw: number;
  type: CalendarExtendedDayMetaType;
  dayNumber: string;
  dayOfWeek: number;
  isWeekendDay: boolean;
}
