import { Directive } from '@angular/core';

@Directive({
    selector: 'fs-nav-user-profile-subname, [fsNavUserProfileSubName]',
    host: { class: 'fs-nav-user-profile-subname' },
    standalone: false
})
export class FsNavUserProfileSubNameDirective {
  constructor() {}
}
