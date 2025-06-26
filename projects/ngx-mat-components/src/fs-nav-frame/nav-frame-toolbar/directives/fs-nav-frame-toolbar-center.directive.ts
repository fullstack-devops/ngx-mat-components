import { Directive } from '@angular/core';

@Directive({
    selector: 'fs-nav-frame-toolbar-center, [fsNavFrameToolbarCenter]',
    host: { class: 'fs-nav-frame-toolbar-center' },
    standalone: false
})
export class FsNavFrameToolbarCenterDirective {
  constructor() {}
}
