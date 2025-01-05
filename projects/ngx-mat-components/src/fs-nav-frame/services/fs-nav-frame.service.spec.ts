import { TestBed } from '@angular/core/testing';

import { FsNavFrameService } from './fs-nav-frame.service';

describe('UiFrameService', () => {
  let service: FsNavFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FsNavFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
