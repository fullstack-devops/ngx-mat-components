import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../../services/fs-nav-frame.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fs-nav-frame-sidebar-item',
  templateUrl: './fs-nav-frame-sidebar-item.component.html',
  styleUrls: ['./fs-nav-frame-sidebar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-sidebar-item',
    'data-component-id': 'fs-nav-frame-sidebar-item-unique',
  },
  standalone: false,
})
export class FsNavFrameSidebarItemComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() routerLink: string | undefined;
  @ViewChild(TemplateRef) template: TemplateRef<any> | undefined;

  closed: boolean = this.frameService.menuState == MenuState.CLOSED;

  constructor(public frameService: FsNavFrameService) {}

  ngOnInit() {
    this.frameService.menuStateEvent.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state == MenuState.OPENED) {
        this.closed = false;
      } else {
        this.closed = true;
      }
    });
  }

  closeSidemenu() {
    if (this.frameService.menuState == MenuState.OPENED) {
      this.frameService.switchMenuState();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
