import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-user-profile-subname, [fsNavUserProfileSubName]',
  host: { class: 'fs-nav-user-profile-subname' },
})
export class FsNavUserProfileSubNameDirective {
  constructor() {}
}
