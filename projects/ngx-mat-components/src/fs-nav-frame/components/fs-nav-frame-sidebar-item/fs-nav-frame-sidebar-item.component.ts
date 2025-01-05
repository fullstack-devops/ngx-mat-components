import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-sidebar-item',
  templateUrl: './fs-nav-frame-sidebar-item.component.html',
  styleUrls: ['./fs-nav-frame-sidebar-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-sidebar-item',
  },
})
export class FsNavFrameSidebarItemComponent implements OnInit {
  @Input() routerLink: string | undefined;
  @ViewChild(TemplateRef) template: TemplateRef<any> | undefined;

  closed: boolean = this.frameService.menuState == MenuState.CLOSED;

  constructor(public frameService: FsNavFrameService) {
  }

  ngOnInit() {
    this.frameService.menuStateEvent.subscribe(state => {
      if (state == MenuState.OPENED) {
        this.closed = false;
      } else {
        this.closed = true;
      }
    });
  }
}
