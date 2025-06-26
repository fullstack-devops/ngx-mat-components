import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../services/fs-nav-frame.service';

@Component({
    selector: 'fs-nav-frame-toolbar',
    templateUrl: './fs-nav-frame-toolbar.component.html',
    styleUrls: ['./fs-nav-frame-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fs-nav-frame-toolbar',
    },
    standalone: false
})
export class FsNavFrameToolbarComponent implements OnInit, OnDestroy {
  @ContentChild('tbcontent') tbcontent: TemplateRef<any> | undefined;

  @HostBinding('class') openedClass = '';

  constructor(private frameService: FsNavFrameService) {}

  ngOnInit() {
    this.frameService.menuStateEvent.subscribe((state: MenuState) => {
      if (state == MenuState.OPENED) {
        this.openedClass = 'opened';
      } else {
        this.openedClass = '';
      }
    });
  }

  ngOnDestroy() {
    this.frameService.menuStateEvent.unsubscribe();
  }
}
