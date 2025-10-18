import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-user-profile',
  templateUrl: './fs-nav-user-profile.component.html',
  styleUrls: ['./fs-nav-user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-user-profile',
    'data-component-id': 'fs-nav-user-profile-unique',
  },
})
export class FsNavUserProfileComponent {
  // Output signal
  readonly onClickProfile = output<any>();

  // Input signals
  readonly profilePicture = input<string>('');
  readonly opened = input<boolean>(false);

  constructor(private frameService: FsNavFrameService) {}

  toggleSidemenu(): void {
    this.frameService.switchMenuState();
  }
}
