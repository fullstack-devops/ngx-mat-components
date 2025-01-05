import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-frame-toolbar-end, [fsNavFrameToolbarEnd]',
  host: { class: 'fs-nav-frame-toolbar-end' },
})
export class FsNavFrameToolbarEndDirective {
  constructor() {}
}
