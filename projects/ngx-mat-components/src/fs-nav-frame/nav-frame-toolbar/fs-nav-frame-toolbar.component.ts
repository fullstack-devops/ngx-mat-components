import { ChangeDetectionStrategy, Component, computed, ContentChild, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FsNavFrameService, MenuState } from '../services/fs-nav-frame.service';

@Component({
  selector: 'fs-nav-frame-toolbar',
  templateUrl: './fs-nav-frame-toolbar.component.html',
  styleUrls: ['./fs-nav-frame-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-nav-frame-toolbar',
    'data-component-id': 'fs-nav-frame-toolbar-unique',
    '[class.opened]': 'isOpened()',
  },
})
export class FsNavFrameToolbarComponent {
  private readonly frameService = inject(FsNavFrameService);

  @ContentChild('tbcontent') tbcontent: TemplateRef<any> | undefined;

  protected readonly isOpened = computed(() => this.frameService.menuState() === MenuState.OPENED);
}
