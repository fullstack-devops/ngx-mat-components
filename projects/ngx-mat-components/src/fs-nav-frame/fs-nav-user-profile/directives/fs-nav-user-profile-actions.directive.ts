import { Directive } from '@angular/core';

@Directive({
  selector: 'fs-nav-user-profile-actions, [fsNavUserProfileActions]',
  host: { class: 'fs-nav-user-profile-actions' },
})
export class FsNavUserProfileActionsDirective {
  constructor() {}
}
