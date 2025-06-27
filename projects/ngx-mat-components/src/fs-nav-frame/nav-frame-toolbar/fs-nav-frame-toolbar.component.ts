import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../services/fs-nav-frame.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'fs-nav-frame-toolbar',
  templateUrl: './fs-nav-frame-toolbar.component.html',
  styleUrls: ['./fs-nav-frame-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-toolbar',
    'data-component-id': 'fs-nav-frame-toolbar-unique',
  },
  standalone: false,
})
export class FsNavFrameToolbarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ContentChild('tbcontent') tbcontent: TemplateRef<any> | undefined;

  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsNavFrameService) {}

  ngOnInit() {
    this.frameService.menuStateEvent.pipe(takeUntil(this.destroy$)).subscribe((state: MenuState) => {
      if (state == MenuState.OPENED) {
        this.openedClass = 'opened';
      } else {
        this.openedClass = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
