import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-user-profile-name, [fsNavUserProfileName]',
  host: { class: 'fs-nav-user-profile-name' },
  standalone: false,
})
export class FsNavUserProfileNameDirective {
  constructor() {}
}
