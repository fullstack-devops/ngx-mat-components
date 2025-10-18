import { Component, ContentChild, ElementRef, input, effect, computed, AfterViewInit, OnDestroy, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavFrameConfig, NavFrameSizing } from './fs-nav-frame.modules';
import { FsNavFrameService, MenuState } from './services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame',
  templateUrl: './fs-nav-frame.component.html',
  styleUrls: ['./fs-nav-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame',
    'data-component-id': 'fs-nav-frame-unique',
  },
})
export class FsNavFrameComponent implements AfterViewInit, OnDestroy {
  // Inputs as signals
  readonly navFrameConfig = input<NavFrameConfig>({ appName: '' });
  readonly sizing = input<NavFrameSizing>({
    toolbarHeight: 3,
    sidebarWidthClosed: 4,
    sidebarWidthOpened: 18,
  });

  @ContentChild('navLinks') navLinks: TemplateRef<any> | undefined;

  private readonly body = document.querySelector('body');
  private profileContentElement: HTMLElement | null = null;

  // Computed from service
  protected readonly isClosed = computed(() => this.frameService.isMenuClosed());

  constructor(
    private elementRef: ElementRef,
    protected frameService: FsNavFrameService,
    private titleService: Title
  ) {
    // Effect for sizing changes
    effect(() => {
      const size = this.sizing();
      this.body?.style.setProperty('--toolbar-height', `${size.toolbarHeight}rem`);
      this.body?.style.setProperty('--sidebar-width-closed', `${size.sidebarWidthClosed}rem`);
      this.body?.style.setProperty('--sidebar-width-opened', `${size.sidebarWidthOpened}rem`);

      // Update service sizing
      this.frameService.setSizing(size);
    });

    // Effect for menu state changes
    effect(() => {
      const state = this.frameService.menuState();
      if (this.profileContentElement) {
        if (state === MenuState.OPENED) {
          this.profileContentElement.classList.add('opened');
        } else {
          this.profileContentElement.classList.remove('opened');
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.profileContentElement = this.elementRef.nativeElement.querySelector('.fs-nav-user-profile .profile-content-wrapper');
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  toggleSidemenu(): void {
    this.frameService.switchMenuState();
  }

  closeSidebar(): void {
    if (this.frameService.menuState() === MenuState.OPENED) {
      this.frameService.switchMenuState();
    }
  }
}
