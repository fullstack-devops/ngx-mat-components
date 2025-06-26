import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService } from '../services/fs-nav-frame.service';

@Component({
    selector: 'fs-nav-user-profile',
    templateUrl: './fs-nav-user-profile.component.html',
    styleUrls: ['./fs-nav-user-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fs-nav-user-profile',
    },
    standalone: false
})
export class FsNavUserProfileComponent implements OnInit {
  @Output() onClickProfile = new EventEmitter<any>();

  @Input() profilePicture: string = '';
  @Input() opened: boolean = false;

  constructor(private frameService: FsNavFrameService) {}

  ngOnInit(): void {}

  toggleSidemenu() {
    this.frameService.switchMenuState();
  }
}
