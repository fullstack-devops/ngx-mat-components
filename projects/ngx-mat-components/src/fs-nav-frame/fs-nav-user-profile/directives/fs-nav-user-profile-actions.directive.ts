import { Directive } from '@angular/core';

@Directive({
    selector: 'fs-nav-user-profile-actions, [fsNavUserProfileActions]',
    host: { class: 'fs-nav-user-profile-actions' },
    standalone: false
})
export class FsNavUserProfileActionsDirective {
  constructor() {}
}
