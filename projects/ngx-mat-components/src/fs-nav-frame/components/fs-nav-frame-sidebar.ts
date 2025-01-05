import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-sidebar',
  exportAs: 'fsNavFrameSidebar',
  template: '<ng-content></ng-content>',
  host: {
    class: 'fs-nav-frame-sidebar',
    role: 'navigation',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FsNavFrameService],
  standalone: true,
})
export class FsNavFrameSidebar {}
