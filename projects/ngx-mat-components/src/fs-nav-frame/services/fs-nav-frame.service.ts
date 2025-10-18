import { Injectable, signal, computed } from '@angular/core';
import { NavFrameSizing } from '../fs-nav-frame.modules';

export enum MenuState {
  CLOSED = 'closed',
  OPENED = 'opened',
}

@Injectable()
export class FsNavFrameService {
  // Private writable signals
  private readonly _menuState = signal<MenuState>(MenuState.CLOSED);
  private readonly _sizing = signal<NavFrameSizing>({
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  });

  // Public readonly signals
  readonly menuState = this._menuState.asReadonly();
  readonly sizing = this._sizing.asReadonly();

  // Computed signals
  readonly isMenuClosed = computed(() => this._menuState() === MenuState.CLOSED);
  readonly isMenuOpened = computed(() => this._menuState() === MenuState.OPENED);

  // Actions
  switchMenuState(): void {
    this._menuState.update(state =>
      state === MenuState.OPENED ? MenuState.CLOSED : MenuState.OPENED
    );
  }

  changeMenuStateToClosed(): void {
    this._menuState.set(MenuState.CLOSED);
  }

  openMenu(): void {
    this._menuState.set(MenuState.OPENED);
  }

  setSizing(sizing: NavFrameSizing): void {
    this._sizing.set(sizing);
  }
}
