import { EventEmitter, Injectable } from '@angular/core';
import { NavFrameSizing } from '../fs-nav-frame.modules';

export enum MenuState {
  CLOSED = 'closed',
  OPENED = 'opened',
}

@Injectable()
export class FsNavFrameService {
  isMenuClosed = new EventEmitter<boolean>();
  menuState: MenuState = MenuState.CLOSED;
  menuStateEvent = new EventEmitter<MenuState>();

  sizing: NavFrameSizing = {
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  };

  switchMenuState() {
    if (this.menuState == MenuState.OPENED) {
      this.menuStateEvent.emit(MenuState.CLOSED);
    } else {
      this.menuStateEvent.emit(MenuState.OPENED);
    }
  }

  changeMenuStateToClosed() {
    this.menuState = MenuState.CLOSED;
    this.menuStateEvent.emit(MenuState.CLOSED);
  }
}
