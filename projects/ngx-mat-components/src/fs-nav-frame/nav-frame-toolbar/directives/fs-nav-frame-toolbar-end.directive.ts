import { Directive } from '@angular/core';

@Directive({
    selector: 'fs-nav-frame-toolbar-end, [fsNavFrameToolbarEnd]',
    host: { class: 'fs-nav-frame-toolbar-end' },
    standalone: false
})
export class FsNavFrameToolbarEndDirective {
  constructor() {}
}
