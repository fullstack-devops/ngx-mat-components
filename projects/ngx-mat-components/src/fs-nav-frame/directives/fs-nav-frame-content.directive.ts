import { Directive } from '@angular/core';

@Directive({
    selector: 'fs-nav-frame-content, [fsNavFrameContent]',
    host: { class: 'fs-nav-frame-content' },
    standalone: false
})
export class FsNavFrameContentDirective {
  constructor() {}
}
