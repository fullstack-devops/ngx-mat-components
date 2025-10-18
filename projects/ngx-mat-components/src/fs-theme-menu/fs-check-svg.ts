import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'fs-check-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fs-check-svg',
  },
  template: `
    @if (active()) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    } @else {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
      </svg>
    }
  `,
})
export class FsCheckSvg {
  active = input<boolean>(false);
}
