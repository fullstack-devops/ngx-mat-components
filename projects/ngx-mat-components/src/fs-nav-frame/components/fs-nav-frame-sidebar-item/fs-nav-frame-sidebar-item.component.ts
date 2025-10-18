import { ChangeDetectionStrategy, Component, input, computed, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FsNavFrameService, MenuState } from '../../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-sidebar-item',
  templateUrl: './fs-nav-frame-sidebar-item.component.html',
  styleUrls: ['./fs-nav-frame-sidebar-item.component.scss'],
  imports: [RouterLink, RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-sidebar-item',
    'data-component-id': 'fs-nav-frame-sidebar-item-unique',
  },
})
export class FsNavFrameSidebarItemComponent {
  // Input signal
  readonly routerLink = input<string | undefined>();

  @ViewChild(TemplateRef) template: TemplateRef<any> | undefined;

  // Computed signal from service
  protected readonly closed = computed(() => this.frameService.isMenuClosed());

  constructor(protected frameService: FsNavFrameService) {}

  closeSidemenu(): void {
    if (this.frameService.menuState() === MenuState.OPENED) {
      this.frameService.switchMenuState();
    }
  }
}
