import { Component, ContentChild, ElementRef, HostBinding, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavFrameConfig, NavFrameSizing } from './fs-nav-frame.modules';
import { FsNavFrameService, MenuState } from './services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  host: {
    class: 'fs-nav-frame',
    'data-component-id': 'fs-nav-frame-unique',
  },
  standalone: false,
})
export class FsNavFrameComponent implements OnInit, OnDestroy {
  @Input() navFrameConfig: NavFrameConfig = {
    appName: '',
  };
  @Input() sizing: NavFrameSizing = {
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  };
  @ContentChild('navLinks') navLinks: TemplateRef<any> | undefined;

  body = document.querySelector('body');
  profileContentElement!: HTMLElement | null;
  isClosed: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private frameService: FsNavFrameService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.body!.style.setProperty('--toolbar-height', `${this.sizing.toolbarHeight!}rem`);
    this.body!.style.setProperty('--sidebar-width-closed', `${this.sizing.sidebarWidthClosed!}rem`);
    this.body!.style.setProperty('--sidebar-width-opened', `${this.sizing.sidebarWidthOpened!}rem`);

    this.frameService.menuStateEvent.subscribe((state: MenuState) => {
      if (state == MenuState.OPENED) {
        this.frameService.menuState = MenuState.OPENED;
        this.isClosed = false;
        if (this.profileContentElement != null) {
          this.profileContentElement.classList.add('opened');
        }
      } else {
        this.frameService.menuState = MenuState.CLOSED;
        this.isClosed = true;
        if (this.profileContentElement != null) {
          this.profileContentElement.classList.remove('opened');
        }
      }
    });
  }

  ngAfterViewInit() {
    this.profileContentElement = (<HTMLElement>this.elementRef.nativeElement).querySelector('.fs-nav-user-profile .profile-content-wrapper');
  }

  ngOnDestroy(): void {
    this.frameService.menuStateEvent.unsubscribe();
  }

  toggleSidemenu() {
    this.frameService.switchMenuState();
  }

  closeSidebar() {
    if (this.frameService.menuState == MenuState.OPENED) {
      this.frameService.switchMenuState();
    }
  }
}
