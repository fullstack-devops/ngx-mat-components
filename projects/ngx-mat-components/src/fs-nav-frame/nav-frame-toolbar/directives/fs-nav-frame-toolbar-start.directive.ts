import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-frame-toolbar-start, [fsNavFrameToolbarStart]',
  host: { class: 'fs-nav-frame-toolbar-start' },
  standalone: false,
})
export class FsNavFrameToolbarStartDirective {
  constructor() {}
}
