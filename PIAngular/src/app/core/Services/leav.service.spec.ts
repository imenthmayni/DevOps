import { TestBed } from '@angular/core/testing';

import { LeavService } from './leav.service';

describe('LeavService', () => {
  let service: LeavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
